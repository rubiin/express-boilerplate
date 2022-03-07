import { StatusCodes } from 'http-status-codes';
import { omit } from '@rubiin/js-utils';
import {
	createUserProfile,
	getUserByCondition,
	getUserById,
	getUserList,
	updateUserPassword,
	updateUserProfile,
} from '../repositories/userRepository';
import { respondError, respondSuccess } from '../utils/responseHelper';
import Lang from '../constants/constants';
import {
	convertStringIdToObjectId,
	sendOtpVerification,
} from '../utils/generic';
import { generateJWTToken } from '../utils/jwt';
import OtpModel from '../models/otpModel';

export const userSignup = async (req, res, next) => {
	try {
		const data = req.body;

		const userExists = await getUserByCondition({
			phoneNumber: data.phoneNumber,
		});

		if (userExists) {
			const err = new Error(Lang.USER_EXISTS);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.USER_TITLE;
			return next(err);
		}

		createUserProfile(data)
			.then(async result => {
				const payload = {
					phoneNumber: result.phoneNumber,
					user: result._id,
				};
				await sendOtpVerification({ data: payload, type: 'SIGNUP' });
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

export const fetchUsersList = async (req, res, next) => {
	try {
		const options = req.query;

		getUserList(options)
			.then(result => {
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

export const loginUser = async (req, res, next) => {
	try {
		const { phoneNumber, password } = req.body;

		const userExists = await getUserByCondition({
			phoneNumber,
		});

		if (!userExists) {
			const err = new Error(Lang.USER_NOT_FOUND);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.USER_TITLE;
			return next(err);
		}

		// check if the provided password match the stored password

		const isPasswordCorrect = await userExists.comparePassword(password);

		if (!isPasswordCorrect) {
			const err = new Error(Lang.CREDENTIAL_FAILED);
			err.code = err.status = StatusCodes.UNAUTHORIZED;
			err.title = Lang.LOGIN_TITLE;
			return next(err);
		}

		const token = await generateJWTToken(userExists, 'accessToken');
		const user = {
			user: userExists._id,
			phoneNumber: userExists.phoneNumber,
			isRegistrationComplete: userExists.isRegistrationComplete,
		};
		return respondSuccess(
			res,
			StatusCodes.OK,
			Lang.LOGIN_TITLE,
			Lang.LOGIN_SUCCESS_MESSAGE,
			{
				...user,
				token: {
					accessToken: token,
					accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
					accessTokenCreatedAt: Date.now(),
				},
			},
		);
	} catch (error) {
		console.log(error);
		return respondError(
			res,
			StatusCodes.INTERNAL_SERVER_ERROR,
			Lang.LOGIN_TITLE,
			error.message,
		);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		if (!req.file) {
			const err = new Error(Lang.IMAGE_REQUIRED);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.USER_TITLE;
			return next(err);
		}

		const data = {
			...req.body,
			profilePic: req.file.filename,
			isRegistrationComplete: true,
		};

		updateUserProfile(data, req.user._id)
			.then(result => {
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
		console.log(error);
		return respondError(
			res,
			StatusCodes.INTERNAL_SERVER_ERROR,
			Lang.LOGIN_TITLE,
			error.message,
		);
	}
};

export const fetchUserProfile = async (req, res, next) => {
	try {
		getUserById(convertStringIdToObjectId(req.user._id))
			.then(result => {
				result = omit(result, ['password']);
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

export const forgotPassword = async (req, res, next) => {
	const { phoneNumber } = req.body;
	const userExists = await getUserByCondition({ phoneNumber });
	if (!userExists) {
		const err = new Error(Lang.USER_NOT_FOUND);
		err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
		err.title = Lang.FORGOT_PASSWORD_TITLE;
		return next(err);
	}
	const payload = {
		phoneNumber: userExists.phoneNumber,
		user: userExists._id,
	};
	sendOtpVerification({ data: payload, type: 'FORGOT_PASSWORD' })
		.then(_result => {
			return respondSuccess(
				res,
				StatusCodes.OK,
				Lang.FORGOT_PASSWORD_TITLE,
				Lang.FORGOT_PASSWORD_SUCCESS_MESSAGE,
			);
		})
		.catch(e => next(e));
};

export const resetUserPassword = async (req, res, _next) => {
	try {
		const { password, otpCode } = req.body;

		const details = await OtpModel.findOne({
			verificationCode: otpCode,
		}).exec();

		updateUserPassword(password, details.user)
			.then(result => {
				result = omit(result, ['password']);
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
		console.log(error);
		return respondError(
			res,
			StatusCodes.INTERNAL_SERVER_ERROR,
			Lang.LOGIN_TITLE,
			error.message,
		);
	}
};
