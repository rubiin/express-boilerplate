import LocationModel from '../models/locationModel';
import { convertStringIdToObjectId } from '../utils/generic';

// create Location
export const createLocation = async data => {
	const Location = new LocationModel(data);
	return Location.save();
};

export const updateLocation = async (id, data) => {
	return LocationModel.findByIdAndUpdate(
		{
			_id: convertStringIdToObjectId(id),
		},
		{
			$set: data,
		},
		{ useFindAndModify: false, new: true },
	);
};

export const getLocationByCondition = async condition => {
	return LocationModel.findOne(condition).exec();
};

export const geLocationById = async id => {
	return LocationModel.findById(id).lean().exec();
};
