import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const eventCreateSchema = Joi.object().keys({
	title: Joi.string().required().min(3).max(50),
	description: Joi.string().required().min(3).max(50),
	startDateTime: Joi.string().required(),
	endDateTime: Joi.string().optional().allow('').allow(null),
	eventLink: Joi.string().optional().allow('').allow(null),
	eventType: Joi.string().required().min(3).max(50),
	eventCategory: Joi.string().required().min(3).max(50),
	latitude: Joi.string().required(),
	longitude: Joi.string().required(),
	city: Joi.string().optional().allow('').allow(null),
	state: Joi.string().optional().allow('').allow(null),
	zipCode: Joi.string().optional().allow('').allow(null),
});

export default eventCreateSchema;
