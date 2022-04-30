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

// fetch all event
router.get('/', fetchEventList);

// fetch event by id
router.get('/:id', authenticateToken, fetchEventById);

// create event
router.post(
	'/',
	authenticateToken,
	upload.single('coverImage'),
	validateRequestBody(eventCreateSchema),
	saveEvent,
);

// update event
router.put(
	'/:id',
	authenticateToken,
	upload.single('coverImage'),
	validateRequestBody(eventCreateSchema),
	updateEvent,
);

// invite to an event
router.post(
	'/:id/invite',
	authenticateToken,
	validateRequestBody(inviteSchema),
	inviteGuests,
);

// delete event
router.delete('/:id', authenticateToken, deleteEvent);

// rsvp to an event
router.put(
	'/:id/rsvp',
	authenticateToken,
	validateRequestBody(rsvpSchema),
	rsvpEvent,
);

export default router;
