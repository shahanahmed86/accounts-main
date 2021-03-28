import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

export const getDecodedToken = (req, doNotThrow) => {
	const authorization = req.headers['authorization'];
	if (!authorization && doNotThrow === false) {
		throw new AuthenticationError('Login session not found...');
	}
	if (authorization) {
		const token = authorization.replace('Bearer ', '');
		return jwt.verify(token, JWT_SECRET);
	}
	return null;
};
