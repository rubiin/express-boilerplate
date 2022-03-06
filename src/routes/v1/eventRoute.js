import express from 'express';
import { fetchEventList } from '../../controllers/eventController';
import { authenticateToken } from '../../utils/jwt';

const router = express.Router();

router.get('/', authenticateToken, fetchEventList);

export default router;
