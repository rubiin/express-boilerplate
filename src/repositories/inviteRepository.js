import InvitationModel from '../models/invitationModel';
import { convertStringIdToObjectId } from '../utils/generic';

export const saveInvites = async (eventId, users) => {
	return InvitationModel.insertMany(
		users.map(user => {
			return { event: eventId, guest: user._id };
		}),
	);
};

export const getInviteByCondition = async condition => {
	return InvitationModel.find(condition);
};

export const saveRsvp = async ({ eventId, guestId, going }) => {
	return InvitationModel.findOneAndUpdate(
		{
			event: convertStringIdToObjectId(eventId),
			guest: convertStringIdToObjectId(guestId),
		},
		{
			isRsvped: true,
			going,
		},
		{
			new: true,
		},
	).exec();
};
