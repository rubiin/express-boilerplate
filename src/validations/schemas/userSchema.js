import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

// const phoneRegex = new RegExp('/9(8|7)\\d{8}/'); // matches phone with 98 and 97 followed by 8 other digits

export const createUserSchema = Joi.object().keys({
	phoneNumber: Joi.string().required().label('Phone Number'),
	fullName: Joi.string().required().min(5).max(50).label('Full Name'),
	password: Joi.string()
		.required()
		.pattern(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		)
		.message(
			'Password must be at least 8 characters long and contain at least one number, one letter and one special character',
		)
		.label('Password'),
});

export const updateUserSchema = Joi.object().keys({
	email: Joi.string()
		.required()
		.email({ tlds: { allow: false } })
		.label('Email'),
	address: Joi.string().required().max(50).label('Address'),
	phoneNumber: Joi.string().optional().label('Phone Number'),
	fullName: Joi.string().optional().min(5).max(50).label('Full Name'),
});

export const forgotPasswordSchema = Joi.object().keys({
	phoneNumber: Joi.string().required().label('Phone Number'),
});

export const resetPasswordSchema = Joi.object().keys({
	password: Joi.string()
		.required()
		.pattern(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		)
		.message(
			'Password must be at least 8 characters long and contain at least one number, one letter and one special character',
		)
		.label('Password'),
	confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});
