import { StatusCodes } from 'http-status-codes';
import { respondError, respondSuccess } from '../utils/responseHelper';
import Lang from '../constants/constants';
import {
	convertStringIdToObjectId,
	sendOtpVerification,
} from '../utils/generic';
import { createHost } from '../repositories/hostRepository';
import {
	createEvent,
	getEventById,
	getEventList,
} from '../repositories/eventRepository';
import { getUserByCondition } from '../repositories/userRepository';
import { createLocation } from '../repositories/locationRepository';

export const saveEvent = async (req, res, next) => {
	try {
		const data = req.body;
		const currentUser = await getUserByCondition({
			_id: convertStringIdToObjectId(req.user._id),
		});

		const [host, location] = await Promise.all([
			createHost(currentUser),
			createLocation(data.location),
		]);
		data.host = host._id;
		data.location = location._id;
		createEvent(data)
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

export const fetchEventList = async (req, res, next) => {
	try {
		const options = req.query;

		getEventList(options)
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

export const fetchEventById = async (req, res, next) => {
	try {
		const eventId = req.params.id;

		getEventById(convertStringIdToObjectId(eventId))
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
