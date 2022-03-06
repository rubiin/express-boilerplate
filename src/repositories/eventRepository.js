import EventModel from '../models/eventModel';

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

export const getEventList = async (
	options = {
		page: 1,
		limit: 10,
		sort: 'desc',
	},
) => {
	options.sort = options.sort === 'desc' ? -1 : 1;
	const data = await EventModel.aggregate([
		{
			$sort: {
				createdAt: options.sort,
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

export const getEventByCondition = async condition => {
	return EventModel.findOne(condition).exec();
};
export const getEventById = async id => {
	return EventModel.findById(id).lean().exec();
};
