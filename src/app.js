import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import createError from 'http-errors';
import bodyParser from 'body-parser';
import compression from 'compression';
import multer from 'multer';
import connectDb from './utils/database';
import routes from './routes/v1';

const app = express();

connectDb();

// middlewares setup
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(express.static(`${__dirname}/uploads`));

// v1 api routes
app.use('/v1', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// all error handler
app.use((err, req, res, _next) => {
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
