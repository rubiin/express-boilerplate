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
		LOGIN_TITLE: 'Login',
		ACCOUNT_DISABLED_TITLE: 'Account Disabled',
		LOGIN_SUCCESS_MESSAGE: 'Logged in successfully',
		INACTIVE_USER:
			'Account is disabled or deactivated. Please contact admin.',
		LOGIN_FAILURE_MESSAGE: 'Login failed',
		CREDENTIAL_FAILED: 'Email/Password is invalid. Please try again.',
		ACCOUNT_DISABLED:
			'Your account has been disabled .To reactivate your account, please contact TipQuick Support at support@tipquick.com',
		ADMIN_VERIFICATION_PENDING:
			'Your account is under review by TipQuick.Please contact TipQuick Support at support@tipquick.com for further support.',
		ACCOUNT_NOT_VERIFIED_ADMIN:
			"An account for this email exists but isn't verified. Please verify your email.",
		ACCOUNT_NOT_VERIFIED:
			"An account for this email exists but isn't verified. Would you like us to resend the verification mail?",

		USER_NOT_FOUND:
			'We are unable to find any account associated with this number.',

		FORGOT_PASSWORD_TITLE: 'Forgot password',
		FORGOT_PASSWORD_SUCCESS_MESSAGE:
			'Password reset link sent successfully. Please check your inbox.',
		FORGOT_PASSWORD_FAILURE_MESSAGE: 'Forgot password failed',

		RESET_PASSWORD_TITLE: 'Reset password',
		RESET_PASSWORD_SUCCESS_MESSAGE: 'Password changed successfully.',
		RESET_PASSWORD_FAILURE_MESSAGE: 'Forgot password failed',
		TOKEN_EXPIRED_MESSAGE: 'Token expired',
		CHANGE_PASSWORD: 'Change password',
		PASSWORD_NOT_MATCH: 'Old password does not match',

		LOGOUT_TITLE: 'Logout',
		LOGOUT_FAILURE_MESSAGE: 'Could not log out. Please try again later',
		LOGOUT_SUCCESS_MESSAGE: 'Logged out successfully',
		DEVICE_NOT_FOUND: 'Device not found',

		// token
		TOKEN_TITLE: 'Token',
		TOKEN_NOT_FOUND: 'Token not found on request.',
		TOKEN_EXPIRED_OR_INVALID_MESSAGE: 'Expired/Invalid Token',

		USER_TITLE: 'User',
		USER_EXISTS: 'Users with phone number already exists',
		USER_FETCH_SUCCESS: 'User fetched successfully.',
		USER_FETCH_FAILURE: 'User fetched failure.',
	},
};

const lang = process.env.SYSTEM_LANGUAGE || 'EN';

let Lang;

if (lang == 'EN') {
	Lang = responseMessages.EN;
}

export default Lang;
