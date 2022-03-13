import { StatusCodes } from 'http-status-codes';
import { isAfter } from 'date-fns';
import { respondError, respondSuccess } from '../utils/responseHelper';
import {
	getVerificationCodeDetails,
	verifyDevice,
} from '../repositories/verifyRepository';
import Lang from '../constants/constants';

const verifyOtp = async (req, res) => {
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
				Lang.OTP_VERIFICATION_TITLE,
				Lang.OTP_VERIFICATION_ERROR,
			);
		}

		const isExpired = isAfter(new Date(), new Date(codeDetails.expiryDate));
		if (isExpired) {
			return respondError(
				res,
				500,
				Lang.OTP_VERIFICATION_TITLE,
				Lang.OTP_EXPIRED_MESSAGE,
			);
		}

		console.log(codeDetails);

		const response = await verifyDevice(
			codeDetails.user,
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

export default verifyOtp;
