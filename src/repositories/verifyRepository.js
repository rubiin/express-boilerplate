import OtpModel from '../models/otpModel';
import { convertStringIdToObjectId } from '../utils/generic';
import UserModel from '../models/userModel';

export const getVerificationCodeDetails = async (otp, phoneNumber) => {
	console.log(otp, phoneNumber);
	try {
		let details = await OtpModel.findOne({
			verificationCode: otp,
			phoneNumber,
			isUsed: false,
		}).exec();
		return details;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const verifyDevice = async (userId, phoneNumber, otpId) => {
	try {
		const otp = OtpModel.findByIdAndUpdate(
			convertStringIdToObjectId(otpId),
			{
				$set: {
					isUsed: true,
				},
			},
		);

		const user = UserModel.findByIdAndUpdate(
			convertStringIdToObjectId(userId),
			{
				$set: {
					isVerified: true,
				},
			},
		);

		await Promise.all([otp, user]);

		return true;
	} catch (e) {
		console.log('Device verification code error');
		console.log(e);
	}
};
