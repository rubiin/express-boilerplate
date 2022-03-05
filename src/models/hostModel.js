import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const HostSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

HostSchema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true,
});

HostSchema.pre('save', next => {
	next();
});

const HostModel = mongoose.model('Host', HostSchema);

export default HostModel;
