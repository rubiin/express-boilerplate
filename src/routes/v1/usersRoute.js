import express from 'express';
import {
	fetchUserProfile,
	fetchUsersList,
	updateUser,
	userSignup,
} from '../../controllers/userController';
import { validateRequestBody } from '../../validations/validator';
import { authenticateToken } from '../../utils/jwt';
import upload from '../../utils/fileUpload';
import {
	createUserSchema,
	updateUserSchema,
} from '../../validations/schemas/userSchema';

const router = express.Router();

router.get('/', authenticateToken, fetchUsersList);
router.get('/profile', authenticateToken, fetchUserProfile);

router.post('/', validateRequestBody(createUserSchema), userSignup);
router.put(
	'/',
	authenticateToken,
	upload.single('profilePic'),
	validateRequestBody(updateUserSchema),
	updateUser,
);

export default router;
