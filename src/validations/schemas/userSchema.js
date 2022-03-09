import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const phoneRegex = /^9(7|8)\d{8}$/;

const passwordRegex =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const createUserSchema = Joi.object().keys({
	phoneNumber: Joi.string()
		.required()
		.pattern(phoneRegex)
		.message('Phone number must be 10 digits long and start with 98 or 97'),
	fullName: Joi.string().required().min(5).max(50),
	password: Joi.string()
		.required()
		.pattern(passwordRegex)
		.message(
			'Password must be at least 8 characters long and contain at least one number, one letter and one special character',
		),
});

export const updateUserSchema = Joi.object().keys({
	email: Joi.string()
		.required()
		.email({ tlds: { allow: false } }),
	address: Joi.string().required().max(50),
	phoneNumber: Joi.string()
		.optional()
		.pattern(phoneRegex)
		.message('Phone number must be 10 digits long and start with 98 or 97'),
	fullName: Joi.string().optional().min(5).max(50),
});

export const sendOtpSchema = Joi.object().keys({
	phoneNumber: Joi.string()
		.required()
		.pattern(phoneRegex)
		.message('Phone number must be 10 digits long and start with 98 or 97'),
});

export const resetPasswordSchema = Joi.object().keys({
	otpCode: Joi.string().required(),
	password: Joi.string()
		.required()
		.pattern(passwordRegex)
		.message(
			'Password must be at least 8 characters long and contain at least one number, one letter and one special character',
		),
	confirmPassword: Joi.string()
		.required()
		.valid(Joi.ref('password'))
		.messages({ 'any.only': 'Passwords do not match' }),
});
