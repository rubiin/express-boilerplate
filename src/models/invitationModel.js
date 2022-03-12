import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const InvitationSchema = new Schema(
	{
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Event',
			required: true,
		},
		guest: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		isRsvped: {
			// set after user rsvps
			type: Boolean,
			required: false,
			default: false,
		},
		going: {
			type: String,
			required: false,
			enum: ['YES', 'NO', 'MAYBE', null],
			default: null,
		},
		message: {
			type: String,
			required: false,
			default: null,
		},
	},
	{ timestamps: true },
);

InvitationSchema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true,
});

InvitationSchema.pre('save', next => {
	next();
});

const InvitationModel = mongoose.model('Invitation', InvitationSchema);

export default InvitationModel;
