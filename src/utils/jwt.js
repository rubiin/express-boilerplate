import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import Lang from '../constants/constants';

export const generateJWTToken = async user => {
	const secret = process.env.JWT_SECRET;
	const expiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRE_IN, 10);

	const payload = {
		_id: user._id,
		phoneNumber: user.phoneNumber,
	};

	console.log(secret, expiresIn);

	return jwt.sign(payload, secret, { expiresIn });
};

export function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		const err = new Error(Lang.TOKEN_NOT_FOUND);
		err.code = err.status = StatusCodes.UNAUTHORIZED;
		err.title = Lang.TOKEN_TITLE;
		return next(err);
	}

	jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
		if (error) {
			const err = new Error(Lang.TOKEN_EXPIRED_OR_INVALID_MESSAGE);
			err.code = err.status = StatusCodes.UNAUTHORIZED;
			err.title = Lang.TOKEN_TITLE;
			return next(err);
		}

		req.user = user;

		next();
	});
}
