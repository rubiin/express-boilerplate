import express from 'express';
import userRouter from './users';
import verifyRoute from './verify';

const router = express.Router();

const routes = [
	{
		path: '/user',
		route: userRouter(),
	},
	{
		path: '/verify',
		route: verifyRoute(),
	},
];

routes.forEach(route => {
	router.use(route.path, route.route);
});

export default router;
