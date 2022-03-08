import { StatusCodes } from 'http-status-codes';
import { respondError, respondSuccess } from '../utils/responseHelper';
import Lang from '../constants/constants';
import { convertStringIdToObjectId } from '../utils/generic';
import { createHost } from '../repositories/hostRepository';
import {
	createEvent,
	getEventById,
	getEventList,
	saveInvites,
	saveRsvp,
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
					Lang.EVENT_TITLE,
					Lang.EVENT_CREATE_SUCCESS,
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
					Lang.EVENT_FETCH_SUCCESS,
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
					Lang.EVENT_FETCH_SUCCESS,
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

export const inviteGuests = async (req, res, next) => {
	try {
		const eventId = req.params.id;
		const users = await getUserByCondition({
			phoneNumber: { $in: req.body.phoneNumbers },
		});
		saveInvites(eventId, users)
			.then(result => {
				return respondSuccess(
					res,
					StatusCodes.OK,
					Lang.EVENT_TITLE,
					Lang.EVENT_FETCH_SUCCESS,
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

export const rsvpEvent = async (req, res, next) => {
	try {
		const eventId = req.params.id;
		const { going } = req.body;
		const guestId = req.user._id;

		saveRsvp({ eventId, guestId, going })
			.then(result => {
				return respondSuccess(
					res,
					StatusCodes.OK,
					Lang.EVENT_TITLE,
					Lang.RSVP_SUCCESS,
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
