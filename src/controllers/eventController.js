import { respondError, respondSuccess } from '../utils/responseHelper';
import { createUser, getUserByCondition } from '../repositories/userRepository';
import Lang from '../constants/constants';
import { StatusCodes } from 'http-status-codes';
import { sendOtpVerification } from '../utils/generic';
import { createHost } from '../repositories/hostRepository';
import { createEvent } from '../repositories/eventRepository';

export const saveEvent = async (req, res, next) => {
	try {
		const data = req.body;
		const host = await createHost(data);
		data.hostId = host._id;
		return createEvent(data)
			.then(async result => {
				const data = {
					phoneNumber: result.phoneNumber,
					user: result._id,
				};
				await sendOtpVerification(data);
				return respondSuccess(
					res,
					StatusCodes.OK,
					Lang.USER_TITLE,
					Lang.SUCCESS,
					data,
				);
			})
			.catch(err => {
				console.log(err);
				return respondError(
					res,
					StatusCodes.UNPROCESSABLE_ENTITY,
					Lang.FAILURE,
					Lang.SOMETHING_WENT_WRONG,
				);
			});
	} catch (error) {
		console.log('error', error);
		next(error);
	}
};
