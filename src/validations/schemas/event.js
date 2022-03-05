import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

export const eventCreateSchema = Joi.object().keys({
	title: Joi.string().required().min(3).max(50).label('Title'),
	description: Joi.string().required().min(3).max(50).label('Description'),
	dateTime: Joi.string().required().min(3).max(50).label('DateTime'),
	address: Joi.string().required().min(3).max(50).label('Address'),
	eventType: Joi.string().required().min(3).max(50).label('EventType'),
	eventCategory: Joi.string()
		.required()
		.min(3)
		.max(50)
		.label('EventCategory'),
});
