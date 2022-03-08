import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const otpVerifySchema = Joi.object().keys({
	otpCode: Joi.string().required(),
	phoneNumber: Joi.string().required(),
});
export default otpVerifySchema;
