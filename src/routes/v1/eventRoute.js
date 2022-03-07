import express from 'express';
import {
	fetchEventById,
	fetchEventList,
	saveEvent,
} from '../../controllers/eventController';
import { authenticateToken } from '../../utils/jwt';
import { validateRequestBody } from '../../validations/validator';
import eventCreateSchema from '../../validations/schemas/eventSchema';
import upload from '../../utils/fileUpload';

const router = express.Router();

router.get('/', authenticateToken, fetchEventList);
router.get('/:id', authenticateToken, fetchEventById);
router.post(
	'/',
	authenticateToken,
	upload.single('coverImage'),
	validateRequestBody(eventCreateSchema),
	saveEvent,
);

export default router;
