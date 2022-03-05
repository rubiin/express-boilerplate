import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const OtpSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		verificationCode: {
			type: String,
			required: true,
		},
		isExpired: {
			type: Boolean,
			default: false,
		},
		expiryDate: {
			type: Date,
			default: new Date(new Date().getTime() + 5 * 60 * 1000).getTime(), // current + 5 minutes
		},
	},
	{ timestamps: true },
);

OtpSchema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true,
});

OtpSchema.pre('save', next => {
	next();
});

const OtpModel = mongoose.model('Otp', OtpSchema);

export default OtpModel;
