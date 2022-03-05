// Import the mongoose module
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
	path: path.join(__dirname, `../../env/.env.${process.env.NODE_ENV}`),
});

// Set up default mongoose connection
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = encodeURIComponent(process.env.DB_PASS);

let mongoDB = '';
if (process.env.NODE_ENV === 'local') {
	mongoDB = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
} else {
	mongoDB = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
}

const connectDb = function () {
	mongoose.connect(mongoDB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});

	mongoose.connection.on('connected', () => {
		console.log('DB CONNECTED');
	});

	mongoose.connection.on('error', err => {
		console.log(`DB CONNECTION ERROR  ${err}`);
		process.exit(0);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('DB DISCONNECTED');
	});

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log('DB disconnected due to application termination');
			process.exit(0);
		});
	});
};

export default connectDb;
