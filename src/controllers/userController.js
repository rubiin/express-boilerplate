import {
	createUser,
	getUserByCondition,
	getUserList,
} from '../repositories/userRepository';
import { respondError, respondSuccess } from '../utils/responseHelper';
import Lang from '../constants/constants';
import { StatusCodes } from 'http-status-codes';
import OtpModel from '../models/otpModel';
import { sendOtpVerification, SendOtpVerification } from '../utils/generic';

export const saveUser = async (req, res, next) => {
	try {
		const data = req.body;

		const userExists = await getUserByCondition({
			phoneNumber: data.phoneNumber,
		});

		// if(userExists){
		//     const err = new Error(Lang.USER_EXISTS);
		//     err.status = err.code = StatusCodes.UNPROCESSABLE_ENTITY;
		//     err.title = Lang.USER_TITLE;
		//     return next(err);
		// }

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

// get Partners list
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
