import { StatusCodes } from 'http-status-codes';
import { respondError, respondSuccess } from '../utils/responseHelper';
import Lang from '../constants/constants';
import { convertStringIdToObjectId } from '../utils/generic';
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
		if (!req.file) {
			const err = new Error(Lang.IMAGE_REQUIRED);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.USER_TITLE;
			return next(err);
		}

		const data = req.body;

		const currentUser = await getUserByCondition({
			_id: convertStringIdToObjectId(req.user._id),
		});

		const locationData = {
			city: data.city,
			state: data.state,
			zipCode: data.zipCode,
			latitude: data.latitude,
			longitude: data.longitude,
		};

		const [host, location] = await Promise.all([
			createHost(currentUser),
			createLocation(locationData),
		]);
		data.host = host._id;
		data.location = location._id;
		data.coverImage = req.file.filename;
		createEvent(data)
			.then(async result => {
				return respondSuccess(
					res,
					StatusCodes.OK,
					Lang.USER_TITLE,
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
