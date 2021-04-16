import { AuthenticationError } from 'apollo-server-express';
import { SESSION_NAME } from '../config';

const signedIn = (req, keyId) => req.session[keyId];

export const ensureSignedIn = (req, doNotThrow, keyId) => {
	if (!signedIn(req, keyId) && !doNotThrow) throw new AuthenticationError('You must be signed in.');
};

export const ensureSignedOut = (req, keyId) => {
	if (signedIn(req, keyId)) throw new AuthenticationError('You are already signed in.');
};

export const signOut = (req, res) => {
	return new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			if (err) reject(err);

			res.clearCookie(SESSION_NAME);
			resolve(true);
		});
	});
};
