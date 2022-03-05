import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import usersRouter from './routes/users';
import connectDb from "./utils/database";
import createError from "http-errors";

const app = express();

connectDb();

app.use(logger('dev'));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    // res.status(err.status || 500);
    // console.log('from server',err.message)
    // return res.json({
    //   title: err.title || 'Internal server error',
    //   message: err.message,
    //   data: [],
    // });


    let statusCode = 0;
    if (err.status) statusCode = err.status;
    else if (err.code) statusCode = err.code;
    else statusCode = 500;

    res.status(statusCode >= 100 && statusCode < 600 ? statusCode : 500);
    return res.json({
        title: err.title ? err.title : "Internal Server Error",
        message: err.message,
    });
});


export default app;
