import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import usersRouter from './routes/users';
import verifyRoute from './routes/verify';
import connectDb from './utils/database';
import createError from 'http-errors';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();

connectDb();

// middlewares setup
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(express.static(`${__dirname}/uploads`));

// routes setup
app.use('/user', usersRouter);
app.use('/verify', verifyRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// all error handler
app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		if (err.code === 'LIMIT_FILE_SIZE') {
			res.status(413);
			return res.json({
				message: 'Filesize too large, must be < 5MB',
			});
		}
	}

	let statusCode = 0;
	if (err.status) statusCode = err.status;
	else if (err.code) statusCode = err.code;
	else statusCode = 500;

	res.status(statusCode >= 100 && statusCode < 600 ? statusCode : 500);
	return res.json({
		title: err.title ? err.title : 'Internal Server Error',
		message: err.message,
	});
});

export default app;
