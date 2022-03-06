import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const eventCreateSchema = Joi.object().keys({
	title: Joi.string().required().min(3).max(50).label('Title'),
	description: Joi.string().required().min(3).max(50).label('Description'),
	startDateTime: Joi.string().required().label('Start Date Time'),
	endDateTime: Joi.string()
		.optional()
		.allow('')
		.allow(null)
		.label('End Date Time'),
	eventLink: Joi.string()
		.optional()
		.allow('')
		.allow(null)
		.label('End Date Time'),
	eventType: Joi.string().required().min(3).max(50).label('EventType'),
	eventCategory: Joi.string()
		.required()
		.min(3)
		.max(50)
		.label('EventCategory'),
});

export default eventCreateSchema;
