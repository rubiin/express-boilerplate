import express from 'express';
import {
	fetchUsersList,
	loginUser,
	saveUser,
} from '../../controllers/userController';
import { validateRequestBody } from '../../validations/validator';
import createUserSchema from '../../validations/schemas/user';
import { authenticateToken } from '../../utils/jwt';

const router = express.Router();

router.post('/', validateRequestBody(createUserSchema), saveUser);
router.post('/login', loginUser);
router.get('/', authenticateToken, fetchUsersList);

export default router;
