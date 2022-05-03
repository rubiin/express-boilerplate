import EventModel from '../models/eventModel';
import UserModel from '../models/userModel';
import { convertStringIdToObjectId } from '../utils/generic';

export const createUserProfile = async data => {
	const user = new UserModel(data);
	return user.save();
};

export const updateUserProfile = async (data, id) => {
	return UserModel.findByIdAndUpdate(
		{
			_id: convertStringIdToObjectId(id),
		},
		{
			$set: data,
		},
		{ useFindAndModify: false, new: true },
	);
};

export const updateUserPassword = async (password, id) => {
	return UserModel.findOneAndUpdate({ _id: id }, { password }, { new: true });
};

export const getUserList = async (
	options = {
		page: 1,
		limit: 10,
		sort: 'desc',
	},
) => {
	options.sort = options.sort === 'desc' ? -1 : 1;
	const data = await UserModel.aggregate([
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

export const getUserByCondition = async condition => {
	return UserModel.findOne(condition).exec();
};

export const getUsersByCondition = async condition => {
	return UserModel.find(condition).exec();
};

export const getUserById = async id => {
	const user = await UserModel.findById(id).lean().exec();
	const events = await EventModel.find({
		user: convertStringIdToObjectId(id),
	}).exec();
	return { user, events };
};
