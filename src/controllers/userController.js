import {
	createUser,
	getUserByCondition,
	getUserList,
} from '../repositories/userRepository';
import { respondError, respondSuccess } from '../utils/responseHelper';
import Lang from '../constants/constants';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, sendOtpVerification } from '../utils/generic';
import { generateJWTToken } from '../utils/jwt';
import { omit } from '@rubiin/js-utils';

export const saveUser = async (req, res, next) => {
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

		return await createUser(data)
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

// get user list
export const fetchUsersList = async (req, res, next) => {
	try {
		let options = req.query;

		return await getUserList(options)
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

		let userExists = await getUserByCondition({
			phoneNumber,
		});

		if (!userExists) {
			const err = new Error(Lang.USER_NOT_FOUND);
			err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
			err.title = Lang.USER_TITLE;
			return next(err);
		}

		let isMatchPassword = await userExists.comparePassword(password);

		if (!isMatchPassword) {
			const err = new Error(Lang.CREDENTIAL_FAILED);
			err.code = err.status = StatusCodes.UNAUTHORIZED;
			err.title = Lang.LOGIN_TITLE;
			return next(err);
		}

		const token = await generateJWTToken(userExists, 'accessToken');
		const user = {
			user: userExists._id,
			phoneNumber: userExists.phoneNumber,
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
