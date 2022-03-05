import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import usersRouter from './routes/users';
import connectDb from "./utils/database";

const app = express();

connectDb();

app.use(logger('extended'));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter);

export default app;
