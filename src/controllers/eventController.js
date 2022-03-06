import { StatusCodes } from 'http-status-codes';
import { respondError, respondSuccess } from '../utils/responseHelper';
import Lang from '../constants/constants';
import { sendOtpVerification } from '../utils/generic';
import { createHost } from '../repositories/hostRepository';
import { createEvent, getEventList } from '../repositories/eventRepository';

export const saveEvent = async (req, res, next) => {
	try {
		const data = req.body;
		const host = await createHost(data);
		data.hostId = host._id;
		return createEvent(data)
			.then(async result => {
				const payload = {
					phoneNumber: result.phoneNumber,
					user: result._id,
				};
				await sendOtpVerification(payload);
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

// get event list
export const fetchEventList = async (req, res, next) => {
	try {
		const options = req.query;

		return await getEventList(options)
			.then(result => {
				return respondSuccess(
					res,
					StatusCodes.OK,
					Lang.EVENT_TITLE,
					Lang.SUCCESS,
					result,
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
