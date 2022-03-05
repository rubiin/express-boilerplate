import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

// const phoneRegex = new RegExp('/9(8|7)\\d{8}/'); // matches phone with 98 and 97 followed by 8 other digits
// const passwordRegex = new RegExp('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'); // minimum eight characters, at least one letter and one number:

const createUserSchema = Joi.object().keys({
	phoneNumber: Joi.string().required().label('Phone Number'),
	fullName: Joi.string().required().min(5).max(50).label('Full Name'),
	password: Joi.string().required().label('Password'),
});
export default createUserSchema;
