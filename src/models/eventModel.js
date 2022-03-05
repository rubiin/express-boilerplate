import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const EventSchema = new Schema(
	{
		hostId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Host',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		coverImage: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		eventType: {
			type: String,
			required: true,
		},
		eventCategory: {
			type: String,
			required: true,
		},
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Location',
			required: true,
		},
		dateTime: {
			type: Date,
		},
	},
	{ timestamps: true },
);

EventSchema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true,
});

EventSchema.pre('save', next => {
	next();
});

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
