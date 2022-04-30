import InvitationModel from '../models/invitationModel';
import { convertStringIdToObjectId } from '../utils/generic';

export const saveInvites = async (eventId, users) => {
	return InvitationModel.insertMany(
		users.map(user => {
			return { event: eventId, guest: user._id };
		}),
	);
};

export const getInvites = async userId => {
	return InvitationModel.find({
		guest: convertStringIdToObjectId(userId),
	}).populate({
		path: 'event',
		populate: { path: 'host' },
	});
};

export const getInviteByCondition = async condition => {
	return InvitationModel.find(condition);
};

export const saveRsvp = async ({ eventId, guestId, data }) => {
	return InvitationModel.findOneAndUpdate(
		{
			event: convertStringIdToObjectId(eventId),
			guest: convertStringIdToObjectId(guestId),
		},
		{
			isRsvped: true,
			...data,
		},
		{
			new: true,
		},
	).exec();
};
