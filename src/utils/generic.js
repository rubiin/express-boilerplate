import mongoose from 'mongoose';
import OtpModel from '../models/otpModel';

export const convertStringIdToObjectId = id => {
	try {
		return mongoose.Types.ObjectId(id);
	} catch (err) {
		return { exception: err };
	}
};

export const sendOtp = async (content, phone) => {
	// eslint-disable-next-line global-require
	const client = require('twilio')(
		process.env.TWILIO_ACCOUNT_SID,
		process.env.TWILIO_AUTH_TOKEN,
	);
	try {
		const message = await client.messages.create({
			body: content,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: `+977${phone}`,
		});
		console.log(message.sid);
	} catch (err) {
		console.log(err);
	}
};

export const sendOtpVerification = async ({ data, type }) => {
	const otpNumber = Math.floor(100000 + Math.random() * 900000); // random six digit otp
	let content = `Your OTP verification code is ${otpNumber}`;
	if (type === 'FORGOT_PASSWORD') {
		content = `Your OTP code for password reset is ${otpNumber}`;
	}
	await sendOtp(content, data.phoneNumber);

	const otp = new OtpModel({
		user: data.user,
		phoneNumber: data.phoneNumber,
		verificationCode: otpNumber,
		expiryDate: new Date(
			new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
		).getTime(),
	});
	return otp.save();
};
