const responseMessages = {
	EN: {
		UNKNOWN_ERROR: 'Unknown error.',
		SUCCESS: 'Success',
		FAILURE: 'Failure',
		UNAUTHORIZED: 'Unauthorized',
		VALIDATION_ERROR: 'Validation Errors.',
		VALIDATION_SUCCESS: 'Validation Success.',
		VALIDATION_FAILURE: 'Validation failed.',
		NOT_ALLOWED: 'Not allowed to update this data',
		SOMETHING_WENT_WRONG: 'Something went wrong. Please try again later.',
		BAD_REQUEST:
			'Something went wrong with requested url. Please try again later.',
		LOGIN_FAILURE_MESSAGE: 'Login failed',
		CREDENTIAL_FAILED: 'Email/Password is invalid. Please try again.',
		USER_NOT_FOUND:
			'We are unable to find any account associated with this number.',

		RESET_PASSWORD_FAILURE_MESSAGE: 'Forgot password failed',
		TOKEN_EXPIRED_MESSAGE: 'Token expired',
		CHANGE_PASSWORD: 'Change password',
		PASSWORD_NOT_MATCH: 'Old password does not match',

		FORGOT_PASSWORD_TITLE: 'Forgot password',
		FORGOT_PASSWORD_SUCCESS_MESSAGE:
			'Otp sent successfully. Please check your inbox.',

		RESET_PASSWORD_TITLE: 'Reset password',

		// otp
		OTP_EXPIRED_MESSAGE:
			'Otp expired. Please try sending the device verification code and try again',
		OTP_VERIFICATION_TITLE: 'Otp verification',
		OTP_SENT_SUCCESS: 'Otp sent successfully. Please check your inbox.',
		OTP_VERIFICATION_ERROR:
			'Device cannot be verified successfully at the moment. Please try sending the device verification code and try agai',

		// login
		RESET_PASSWORD_SUCCESS_MESSAGE: 'Password changed successfully.',
		LOGIN_TITLE: 'Login',
		LOGIN_SUCCESS_MESSAGE: 'Logged in successfully',

		// token
		TOKEN_TITLE: 'Token',
		TOKEN_NOT_FOUND: 'Token not found on request.',
		TOKEN_EXPIRED_OR_INVALID_MESSAGE: 'Expired/Invalid Token',

		// user

		USER_TITLE: 'User',
		SIGNUP_USER_SUCCESS: 'User signup success',
		USER_EXISTS: 'Users with phone number already exists',
		USER_FETCH_SUCCESS: 'User fetched successfully.',
		USER_UPDATE_SUCCESS: 'User updated successfully.',
		USER_FETCH_FAILURE: 'User fetched failure.',

		// event
		EVENT_TITLE: 'Event',
		EVENT_FETCH_SUCCESS: 'Event fetched successfully.',
		EVENT_CREATE_SUCCESS: 'Event created successfully.',
		EVENT_FETCH_FAILURE: 'Event fetched failure.',
		RSVP_SUCCESS: 'Event rsvp success.',
		INVITE_SUCCESS: 'Users invited successfully.',

		// image
		IMAGE_UPLOAD_SUCCESS: 'Image uploaded successfully.',
		IMAGE_REQUIRED: 'Image required.',
	},
};

const lang = process.env.SYSTEM_LANGUAGE || 'EN';

// eslint-disable-next-line import/no-mutable-exports
let Lang;

if (lang === 'EN') {
	Lang = responseMessages.EN;
}

export default Lang;
