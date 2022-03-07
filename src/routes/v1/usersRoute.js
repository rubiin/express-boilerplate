import express from 'express';
import {
	fetchUserProfile,
	fetchUsersList,
	forgotPassword,
	loginUser,
	saveUser,
	updateUser,
} from '../../controllers/userController';
import { validateRequestBody } from '../../validations/validator';
import {
	createUserSchema,
	updateUserSchema,
} from '../../validations/schemas/userSchema';
import { authenticateToken } from '../../utils/jwt';
import upload from '../../utils/fileUpload';

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
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', loginUser);
router.get('/profile', authenticateToken, fetchUserProfile);
router.get('/', authenticateToken, fetchUsersList);

export default router;
