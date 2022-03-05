import mongoose from 'mongoose';
import OtpModel from '../models/otpModel';

export const convertStringIdToObjectId = id => {
	try {
		return mongoose.Types.ObjectId(id);
	} catch (err) {
		return { exception: err };
	}
};

export const sendOtp = (content, phone) => {
	const client = require('twilio')(
		process.env.TWILIO_ACCOUNT_SID,
		process.env.TWILIO_AUTH_TOKEN,
	);
	return client.messages
		.create({
			body: content,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: `+977${phone}`,
		})
		.then(async message => {})
		.catch(err => {
			console.log(err);
		});
};

export const sendOtpVerification = async data => {
	const otpNumber = Math.floor(Math.random() * 1000000); // six digit otp
	data.content = `Your OTP verification code is ${otpNumber}`;
	await sendOtp(data.content, data.phoneNumber);

	const otp = new OtpModel({
		userId: data.user,
		phoneNumber: data.phoneNumber,
		verificationCode: otpNumber,
	});
	return otp.save();
};
