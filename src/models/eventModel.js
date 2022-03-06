import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const EventSchema = new Schema(
	{
		host: {
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
		startDateTime: {
			type: Date,
			required: false,
			default: Date.now,
		},
		endDateTime: {
			type: Date,
			required: false,
			default: null,
		},
		eventLink: {
			type: String,
			required: false,
			default: null,
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
