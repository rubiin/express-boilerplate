import { StatusCodes } from 'http-status-codes';
import { isAfter } from 'date-fns';
import { respondError, respondSuccess } from '../utils/responseHelper';
import {
	getVerificationCodeDetails,
	verifyDevice,
} from '../repositories/verifyRepository';

export const verifyForSignup = async (req, res) => {
	try {
		const { otpCode, phoneNumber } = req.body;

		const codeDetails = await getVerificationCodeDetails(
			otpCode,
			phoneNumber,
		);
		if (!codeDetails) {
			return respondError(
				res,
				StatusCodes.BAD_REQUEST,
				'Verification',
				'Device cannot be verified successfully at the moment. Please try sending the device verification code and try again',
			);
		}

		const isExpired = isAfter(new Date(), new Date(codeDetails.expiryDate));
		if (isExpired) {
			return respondError(
				res,
				500,
				'Verification',
				'Otp expured. Please try sending the device verification code and try again',
			);
		}

		const response = await verifyDevice(
			codeDetails.userId,
			codeDetails.phoneNumber,
			codeDetails._id,
		);
		if (!response) {
			return respondError(
				res,
				500,
				'Verification',
				'Invalid verification code. Please try sending the device verification code and try again',
			);
		}

		return respondSuccess(
			res,
			200,
			'Verification',
			'Device has been verified successfully. Please login to continue',
			response,
		);
	} catch (e) {
		console.log('Error', e);
		return respondError(
			res,
			500,
			'Verification',
			'Device cannot be verified successfully at the moment. Please try again',
		);
	}
};

export const verifyForForgotPassword = async (req, res) => {
	try {
		const { otpCode, phoneNumber } = req.body;

		const codeDetails = await getVerificationCodeDetails(
			otpCode,
			phoneNumber,
		);
		if (!codeDetails) {
			return respondError(
				res,
				StatusCodes.BAD_REQUEST,
				'Verification',
				'Device cannot be verified successfully at the moment. Please try sending the device verification code and try again',
			);
		}

		const isExpired = isAfter(new Date(), new Date(codeDetails.expiryDate));
		if (isExpired) {
			return respondError(
				res,
				500,
				'Verification',
				'Otp expured. Please try sending the device verification code and try again',
			);
		}

		const response = await verifyDevice(
			codeDetails.userId,
			codeDetails.phoneNumber,
			codeDetails._id,
		);
		if (!response) {
			return respondError(
				res,
				500,
				'Verification',
				'Invalid verification code. Please try sending the device verification code and try again',
			);
		}

		return respondSuccess(
			res,
			200,
			'Verification',
			'Device has been verified successfully. Please login to continue',
			response,
		);
	} catch (e) {
		console.log('Error', e);
		return respondError(
			res,
			500,
			'Verification',
			'Device cannot be verified successfully at the moment. Please try again',
		);
	}
};
