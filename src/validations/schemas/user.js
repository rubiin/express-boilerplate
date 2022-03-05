import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import JoiObjectId from "joi-objectid";

const myJoiObjectId = JoiObjectId(JoiBase);
const Joi = JoiBase.extend(JoiDate);

// TODO: add enum validation

export const createUserSchema = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    fullName: Joi.string().required(),
    password: Joi.string().required()
});
