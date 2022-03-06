import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

// const phoneRegex = new RegExp('/9(8|7)\\d{8}/'); // matches phone with 98 and 97 followed by 8 other digits
// const passwordRegex = "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/";// minimum eight characters, at least one letter and one number:

export const createUserSchema = Joi.object().keys({
	phoneNumber: Joi.string().required().label('Phone Number'),
	fullName: Joi.string().required().min(5).max(50).label('Full Name'),
	password: Joi.string().required().label('Password'),
});

export const updateUserSchema = Joi.object().keys({
	email: Joi.string().required().label('Email'),
	address: Joi.string().required().max(50).label('Address'),
});
