import express from 'express';
import { validateRequestBody } from '../../validations/validator';
import otpVerifySchema from '../../validations/schemas/otpSchema';
import verifyOtp from '../../controllers/otpController';

const router = express.Router();

router.post('/', validateRequestBody(otpVerifySchema), verifyOtp);
export default router;
