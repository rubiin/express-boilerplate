import LocationModel from '../models/locationModel';

// create Location
export const createLocation = async data => {
	const Location = new LocationModel(data);
	return Location.save();
};

export const getLocationByCondition = async condition => {
	return LocationModel.findOne(condition).exec();
};

export const geLocationById = async id => {
	return LocationModel.findById(id).lean().exec();
};
