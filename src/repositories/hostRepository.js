import { pick } from '@rubiin/js-utils';
import HostModel from '../models/hostModel';

// create Host
export const createHost = async data => {
	const newHost = pick(data, ['name', 'address', 'phoneNumber']);
	const host = new HostModel(newHost);
	return host.save();
};

export const getHostByCondition = async condition => {
	return HostModel.findOne(condition).exec();
};
