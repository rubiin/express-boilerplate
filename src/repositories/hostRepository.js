import HostModel from '../models/hostModel';
import { pick } from '@rubiin/js-utils';

// create Host
export const createHost = async data => {
	const newHost = pick(data, ['name', 'address', 'phoneNumber']);
	const host = new HostModel(newHost);
	return host.save();
};

export const getHostByCondition = async condition => {
	return await HostModel.findOne(condition).exec();
};
