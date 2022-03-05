import express from 'express';
import logger from 'morgan';
import usersRouter from './routes/users';

const app = express();

app.use(logger('extended'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter);

export default app;
