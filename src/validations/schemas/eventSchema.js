import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const phoneRegex = /^9(7|8)\d{8}$/;

export const eventCreateSchema = Joi.object().keys({
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

export const inviteSchema = Joi.object().keys({
	phoneNumbers: Joi.array().items(
		Joi.string()
			.optional()
			.pattern(phoneRegex)
			.message(
				'Phone number must be 10 digits long and start with 98 or 97',
			),
	),
});

export const rsvpSchema = Joi.object().keys({
	going: Joi.string().required().valid('YES', 'NO', 'MAYBE'),
});
