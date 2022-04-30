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
import { getUserInvites } from '../../controllers/eventController';

const router = express.Router();

// fetch all users
router.get('/', authenticateToken, fetchUsersList);

// fetch logged in user profile
router.get('/profile', authenticateToken, fetchUserProfile);

// get all invites for an event to me
router.post('invites', authenticateToken, getUserInvites);

// user signup
router.post('/', validateRequestBody(createUserSchema), userSignup);

// update user profile
router.put(
	'/',
	authenticateToken,
	upload.single('profilePic'),
	validateRequestBody(updateUserSchema),
	updateUser,
);

export default router;
