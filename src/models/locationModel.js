import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const LocationSchema = new Schema(
	{
		latitude: {
			type: String,
			required: true,
		},
		longitude: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: false,
		},
		state: {
			type: String,
			required: false,
		},
		zipCode: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

LocationSchema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true,
});

LocationSchema.pre('save', next => {
	next();
});

const LocationModel = mongoose.model('Location', LocationSchema);

export default LocationModel;
