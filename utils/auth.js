import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

export const getDecodedToken = (req, doNotThrow) => {
	const authorization = req.headers['authorization'];
	if (!authorization && doNotThrow === false) {
		throw new AuthenticationError('Login session not found...');
	}
	if (authorization) {
		console.log(authorization);
		const token = authorization.replace('Bearer ', '');
		console.log(token);
		if (token) return jwt.verify(token, JWT_SECRET);
	}
	return null;
};
