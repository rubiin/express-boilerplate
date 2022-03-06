import express from 'express';
import {
	fetchEventById,
	fetchEventList,
	saveEvent,
} from '../../controllers/eventController';
import { authenticateToken } from '../../utils/jwt';

const router = express.Router();

router.get('/', authenticateToken, fetchEventList);
router.get('/:id', authenticateToken, fetchEventById);
router.post('/', authenticateToken, saveEvent);

export default router;
