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

		INACTIVE_USER:
			'Account is disabled or deactivated. Please contact admin.',
		LOGIN_FAILURE_MESSAGE: 'Login failed',
		CREDENTIAL_FAILED: 'Email/Password is invalid. Please try again.',
		USER_NOT_FOUND:
			'We are unable to find any account associated with this number.',

		FORGOT_PASSWORD_TITLE: 'Forgot password',
		FORGOT_PASSWORD_SUCCESS_MESSAGE:
			'Otp sent successfully. Please check your inbox.',
		FORGOT_PASSWORD_FAILURE_MESSAGE: 'Forgot password failed',

		RESET_PASSWORD_TITLE: 'Reset password',
		RESET_PASSWORD_SUCCESS_MESSAGE: 'Password changed successfully.',
		RESET_PASSWORD_FAILURE_MESSAGE: 'Forgot password failed',
		TOKEN_EXPIRED_MESSAGE: 'Token expired',
		CHANGE_PASSWORD: 'Change password',
		PASSWORD_NOT_MATCH: 'Old password does not match',

		LOGIN_TITLE: 'Login',
		LOGIN_SUCCESS_MESSAGE: 'Logged in successfully',
		LOGOUT_TITLE: 'Logout',
		LOGOUT_FAILURE_MESSAGE: 'Could not log out. Please try again later',
		LOGOUT_SUCCESS_MESSAGE: 'Logged out successfully',
		DEVICE_NOT_FOUND: 'Device not found',

		// token
		TOKEN_TITLE: 'Token',
		TOKEN_NOT_FOUND: 'Token not found on request.',
		TOKEN_EXPIRED_OR_INVALID_MESSAGE: 'Expired/Invalid Token',

		// user

		USER_TITLE: 'User',
		USER_EXISTS: 'Users with phone number already exists',
		USER_FETCH_SUCCESS: 'User fetched successfully.',
		USER_FETCH_FAILURE: 'User fetched failure.',

		// event
		EVENT_TITLE: 'Event',
		EVENT_FETCH_SUCCESS: 'Event fetched successfully.',
		EVENT_FETCH_FAILURE: 'Event fetched failure.',

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
