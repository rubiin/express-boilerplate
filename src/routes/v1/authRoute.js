import { validateRequestBody } from '../../validations/validator';
import {
	resetPasswordSchema,
	sendOtpSchema,
} from '../../validations/schemas/userSchema';
import {
	forgotPassword,
	loginUser,
	resendToken,
	resetUserPassword,
} from '../../controllers/userController';
import router from './usersRoute';

router.post(
	'/forgot-password',
	validateRequestBody(sendOtpSchema),
	forgotPassword,
);
router.put(
	'/reset-password',
	validateRequestBody(resetPasswordSchema),
	resetUserPassword,
);
router.post('/login', loginUser);
router.post('/resend-token', validateRequestBody(sendOtpSchema), resendToken);

export default router;
