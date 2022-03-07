import express from 'express';
import {
	fetchUserProfile,
	fetchUsersList,
	forgotPassword,
	loginUser,
	resetUserPassword,
	saveUser,
	updateUser,
} from '../../controllers/userController';
import { validateRequestBody } from '../../validations/validator';
import { authenticateToken } from '../../utils/jwt';
import upload from '../../utils/fileUpload';
import {
	createUserSchema,
	updateUserSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
} from '../../validations/schemas/userSchema';

const router = express.Router();

router.post('/', validateRequestBody(createUserSchema), saveUser);
router.put(
	'/',
	authenticateToken,
	upload.single('profilePic'),
	validateRequestBody(updateUserSchema),
	updateUser,
);
router.post('/login', loginUser);
router.post(
	'/forgot-password',
	validateRequestBody(forgotPasswordSchema),
	forgotPassword,
);
router.put(
	'/reset-password',
	validateRequestBody(resetPasswordSchema),
	resetUserPassword,
);
router.get('/profile', authenticateToken, fetchUserProfile);
router.get('/', authenticateToken, fetchUsersList);

export default router;
