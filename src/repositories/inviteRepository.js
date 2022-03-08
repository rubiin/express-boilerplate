import InvitationModel from '../models/invitationModel';

export const createInvite = async invite => {
	const inviteCreated = new InvitationModel(invite);
	return inviteCreated.save();
};

export const getAllInvitesByEventId = async () => {
	return InvitationModel.find({});
};
