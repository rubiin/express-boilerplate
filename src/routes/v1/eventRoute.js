import express from 'express';
import {
	deleteEvent,
	fetchEventById,
	fetchEventList,
	inviteGuests,
	rsvpEvent,
	saveEvent,
	updateEvent,
} from '../../controllers/eventController';
import { authenticateToken } from '../../utils/jwt';
import { validateRequestBody } from '../../validations/validator';
import {
	eventCreateSchema,
	inviteSchema,
	rsvpSchema,
} from '../../validations/schemas/eventSchema';
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

router.put(
	'/:id',
	authenticateToken,
	upload.single('coverImage'),
	validateRequestBody(eventCreateSchema),
	updateEvent,
);

router.post(
	'/:id/invite',
	authenticateToken,
	validateRequestBody(inviteSchema),
	inviteGuests,
);

router.delete('/:id', authenticateToken, deleteEvent);

router.put(
	'/:id/rsvp',
	authenticateToken,
	validateRequestBody(rsvpSchema),
	rsvpEvent,
);

export default router;
