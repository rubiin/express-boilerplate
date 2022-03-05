import jwt from 'jsonwebtoken';
import Lang from '../constants/constants';
import { StatusCodes } from 'http-status-codes';

export const generateJWTToken = async user => {
	const secret = process.env.JWT_SECRET;
	const expiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRE_IN);

	const payload = {
		_id: user._id,
		phoneNumber: user.phoneNumber,
	};

	console.log(secret, expiresIn);

	return jwt.sign(payload, secret, { expiresIn });
};

export function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) {
		const err = new Error(Lang.TOKEN_NOT_FOUND);
		err.code = err.status = StatusCodes.UNAUTHORIZED;
		err.title = Lang.TOKEN_TITLE;
		return next(err);
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		console.log('err', err);
		console.log('data jwt', user);

		if (err) {
			const err = new Error(Lang.TOKEN_EXPIRED_OR_INVALID_MESSAGE);
			err.code = err.status = StatusCodes.UNAUTHORIZED;
			err.title = Lang.TOKEN_TITLE;
			return next(err);
		}

		req.user = user;

		next();
	});
}
