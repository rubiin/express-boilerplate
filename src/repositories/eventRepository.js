import EventModel from '../models/eventModel';

// create event
export const createEvent = async data => {
	const event = new EventModel();
	event.title = data.title;
	event.description = data.description;
	event.coverImage = data.coverImage;
	event.dateTime = data.dateTime;
	event.address = data.address;
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
					{ $addFields: { page: parseInt(options.page) } },
				],
				docs: [
					{
						$skip:
							(parseInt(options.page) - 1) *
							parseInt(options.limit ? options.limit : 10),
					},
					{
						$limit: parseInt(options.limit ? options.limit : 10),
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
					page: parseInt(options.page),
			  };
	return {
		pagination,
		docs: desiredDocs,
	};
};

export const getEventByCondition = async condition => {
	return await EventModel.findOne(condition).exec();
};
