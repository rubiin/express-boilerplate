import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

export const otpVerifySchema = Joi.object().keys({
	otpCode: Joi.string().required().length(6).label('OTP'),
	phoneNumber: Joi.string().required().label('Phone Number'),
});
