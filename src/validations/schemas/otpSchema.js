import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const phoneRegex = /^9(7|8)\d{8}$/;

const otpVerifySchema = Joi.object().keys({
    otpCode: Joi.string().required(),
    phoneNumber: Joi.string()
        .required()
        .pattern(phoneRegex)
        .message('Phone number must be 10 digits long and start with 98 or 97'),
});
export default otpVerifySchema;