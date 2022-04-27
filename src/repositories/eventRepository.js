import EventModel from '../models/eventModel';
import { convertStringIdToObjectId } from '../utils/generic';

// create event
export const createEvent = async data => {
	const event = new EventModel();
	event.title = data.title;
	event.host = data.host;
	event.location = data.location;
	event.eventLink = data.eventLink;
	event.startDateTime = data.startDateTime;
	event.endDateTime = data.endDateTime;
	event.description = data.description;
	event.coverImage = data.coverImage;
	event.dateTime = data.dateTime;
	event.eventCategory = data.eventCategory;
	event.eventType = data.eventType;
	return event.save();
};

export const updateEventById = async (id, data) => {
	return EventModel.findByIdAndUpdate(
		{
			_id: convertStringIdToObjectId(id),
		},
		{
			$set: data,
		},
		{ useFindAndModify: false, new: true },
	);
};

export const deleteEventById = async eventId => {
	return EventModel.findByIdAndDelete(convertStringIdToObjectId(eventId));
};

export const findEventByCondition = async condition => {
	return EventModel.findById(condition);
};

export const getEventList = async (
	options = {
		page: 1,
		limit: 10,
		sort: 'desc',
		type: 'past',
	},
) => {
	options.sort = options.sort === 'desc' ? -1 : 1;

	let matchCondition = {
		startDateTime: { $gte: new Date() },
	};

	if (options.type === 'past') {
		matchCondition = {
			startDateTime: { $lte: new Date() },
		};
	}

	const data = await EventModel.aggregate([
		{
			$match: matchCondition,
		},
		{
			$sort: {
				createdAt: options.sort,
			},
		},
		{
			$lookup: {
				from: 'hosts',
				localField: 'host',
				foreignField: '_id',
				as: 'host',
			},
		},
		{
			$unwind: {
				path: '$host',
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$lookup: {
				from: 'locations',
				localField: 'location',
				foreignField: '_id',
				as: 'location',
			},
		},
		{
			$unwind: {
				path: '$location',
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$addFields: {
				coverImageUrl: {
					$concat: [process.env.API_URL, '/', '$coverImage'],
				},
			},
		},
		{
			$facet: {
				pagination: [
					{ $count: 'total' },
					{ $addFields: { page: parseInt(options.page, 10) } },
				],
				docs: [
					{
						$skip:
							(parseInt(options.page, 10) - 1) *
							parseInt(options.limit ? options.limit : 10, 10),
					},
					{
						$limit: parseInt(
							options.limit ? options.limit : 10,
							10,
						),
					},
				],
			},
		},
	]).allowDiskUse(true);

	const desiredDocs = data[0].docs ? data[0].docs : [];
	const pagination =
		data[0].pagination && data[0].pagination[0] !== undefined
			? data[0].pagination[0]
			: {
					total: 0,
					page: parseInt(options.page, 10),
			  };
	return {
		pagination,
		docs: desiredDocs,
	};
};

export const getEventById = async id => {
	return EventModel.aggregate([
		{ $match: { _id: convertStringIdToObjectId(id) } },
		{
			$lookup: {
				from: 'hosts',
				localField: '_id',
				foreignField: 'event',
				as: 'host',
			},
		},
		{
			$unwind: { path: '$hosts', preserveNullAndEmptyArrays: true },
		},

		{
			$lookup: {
				from: 'invitations',
				localField: '_id',
				foreignField: 'event',
				as: 'invitations',
			},
		},

		{
			$unwind: { path: '$invitations', preserveNullAndEmptyArrays: true },
		},

		{
			$lookup: {
				from: 'users',
				localField: 'invitations.guest',
				foreignField: '_id',
				as: 'invitations.guest',
			},
		},

		{
			$unwind: {
				path: '$invitations.guest',
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$unset: ['invitations.guest.password'],
		},
		{ $group: { _id: '$_id', invitation: { $push: '$invitations' } } },

		{
			$lookup: {
				from: 'events',
				localField: '_id',
				foreignField: '_id',
				as: 'event',
			},
		},

		{
			$unwind: { path: '$event', preserveNullAndEmptyArrays: true },
		},
		{
			$lookup: {
				from: 'locations',
				localField: 'event.location',
				foreignField: '_id',
				as: 'event.location',
			},
		},

		{
			$unwind: {
				path: '$event.location',
				preserveNullAndEmptyArrays: true,
			},
		},

		{
			$lookup: {
				from: 'users',
				localField: 'event.host',
				foreignField: '_id',
				as: 'event.host',
			},
		},

		{
			$unwind: { path: '$event.host', preserveNullAndEmptyArrays: true },
		},

		{
			$addFields: {
				'event.invitations': '$invitation',
			},
		},

		{
			$replaceRoot: {
				newRoot: '$event',
			},
		},
		{
			$addFields: {
				coverImageUrl: {
					$concat: [process.env.API_URL, '/', '$coverImage'],
				},
			},
		},
	]);
};
