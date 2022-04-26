import { StatusCodes } from 'http-status-codes';
import { respondError, respondSuccess } from '../utils/responseHelper';
import Lang from '../constants/constants';
import { convertStringIdToObjectId, resizeImage } from '../utils/generic';
import { createHost } from '../repositories/hostRepository';
import {
	createEvent,
	deleteEventById,
	findEventByCondition,
	getEventById,
	getEventList,
	updateEventById,
} from '../repositories/eventRepository';
import {
	getUserByCondition,
	getUsersByCondition,
} from '../repositories/userRepository';
import {
	createLocation,
	updateLocation,
} from '../repositories/locationRepository';
import {
	getInviteByCondition,
	saveInvites,
	saveRsvp,
} from '../repositories/inviteRepository';

export const saveEvent = async (req, res, next) => {
	try {
		if (!req.file) {
			const err = new Error(Lang.IMAGE_REQUIRED);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.USER_TITLE;
			return next(err);
		}

		await resizeImage(req, 500);

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

export const updateEvent = async (req, res, next) => {
	try {
		const data = req.body;

		if (req.file) {
			data.coverImage = req.file.filename;
			await resizeImage(req, 500);
		}

		const eventExists = await findEventByCondition({
			_id: convertStringIdToObjectId(req.params.id),
			host: convertStringIdToObjectId(req.user._id),
		});

		if (!eventExists) {
			const err = new Error(Lang.EVENT_DOES_NOT_EXIST);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.EVENT_TITLE;
			return next(err);
		}

		const locationData = {
			city: data.city,
			state: data.state,
			zipCode: data.zipCode,
			latitude: data.latitude,
			longitude: data.longitude,
		};

		await updateLocation(eventExists.location, locationData);

		updateEventById(req.params.id, data)
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

		const eventExists = await findEventByCondition({
			_id: convertStringIdToObjectId(eventId),
			host: convertStringIdToObjectId(req.user._id),
		});

		if (!eventExists) {
			const err = new Error(Lang.EVENT_DOES_NOT_EXIST);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.EVENT_TITLE;
			return next(err);
		}

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

		const users = await getUsersByCondition({
			phoneNumber: { $in: req.body.phoneNumbers },
		});

		const eventExists = await findEventByCondition({
			_id: convertStringIdToObjectId(eventId),
		});

		if (!eventExists) {
			const err = new Error(Lang.EVENT_DOES_NOT_EXIST);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.EVENT_TITLE;
			return next(err);
		}

		saveInvites(eventId, users)
			.then(result => {
				return respondSuccess(
					res,
					StatusCodes.OK,
					Lang.EVENT_TITLE,
					Lang.INVITE_SUCCESS,
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

export const deleteEvent = async (req, res, next) => {
	try {
		const eventId = req.params.id;

		deleteEventById(eventId)
			.then(result => {
				return respondSuccess(
					res,
					StatusCodes.OK,
					Lang.EVENT_TITLE,
					Lang.EVENT_DELETE_SUCCESS,
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
		const data = req.body;
		const guestId = req.user._id;

		const findInvite = await getInviteByCondition({
			event: convertStringIdToObjectId(eventId),
			guest: convertStringIdToObjectId(guestId),
		});

		if (!findInvite) {
			const err = new Error(Lang.INVITE_NOT_FOUND);
			err.status = err.code = StatusCodes.NOT_FOUND;
			err.title = Lang.EVENT_TITLE;
			return next(err);
		}

		saveRsvp({ eventId, guestId, data })
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
