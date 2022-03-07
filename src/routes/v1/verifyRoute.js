import express from 'express';
import { validateRequestBody } from '../../validations/validator';
import otpVerifySchema from '../../validations/schemas/otpSchema';
import { verifyForSignup } from '../../controllers/otpController';

const router = express.Router();

router.post('/signup', validateRequestBody(otpVerifySchema), verifyForSignup);
router.post(
	'/forgot-password',
	validateRequestBody(otpVerifySchema),
	verifyForSignup,
);

export default router;
