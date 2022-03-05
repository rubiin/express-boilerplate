import UserModel from '../models/userModel';

// create user profile
export const createUser = async data => {
	const admin = new UserModel(data);
	return admin.save();
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
