import express from 'express';
import userRouter from './usersRoute';
import verifyRoute from './verifyRoute';
import eventRoute from './eventRoute';

const router = express.Router();

const routes = [
	{
		path: '/user',
		route: userRouter,
	},
	{
		path: '/verify',
		route: verifyRoute,
	},
	{
		path: '/event',
		route: eventRoute,
	},
];

routes.forEach(route => {
	router.use(route.path, route.route);
});

export default router;
