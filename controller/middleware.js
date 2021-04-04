import { AuthenticationError } from 'apollo-server-express';
import { checkData, getDecodedToken } from '../utils';

export const checkAuth = async (parent, { shouldAdmin, shouldAccount, doNotThrow }, { req, res, next }) => {
	const isRest = typeof next === 'function';
	try {
		const decoded = getDecodedToken(req, doNotThrow);
		if (decoded) {
			if (shouldAdmin && 'adminId' in decoded) {
				const admin = await checkData({
					tableRef: 'admin',
					key: 'id',
					value: decoded.adminId,
					title: 'Admin'
				});
				req.user = {
					...admin,
					userType: 'admin'
				};
			} else if (shouldAccount && 'accountId' in decoded) {
				const account = await checkData({
					tableRef: 'account',
					key: 'id',
					value: decoded.accountId,
					title: 'Account',
					checkSuspension: true
				});
				req.user = {
					...account,
					userType: 'account'
				};
			} else {
				throw new AuthenticationError("You aren't authorize for such actions...");
			}
		}
		if (isRest) next();
	} catch (error) {
		if (isRest) return res.status(400).send(error.message);
		throw new AuthenticationError(error.message);
	}
};

export const checkGuest = (parent, args, { req, res, next }) => {
	const isRest = typeof next === 'function';
	try {
		if (req.headers['authorization']) {
			throw new AuthenticationError('You have an active login session...');
		}
		if (isRest) next();
	} catch (error) {
		if (isRest) return res.status(400).send(error.message);
		throw new AuthenticationError(error.message);
	}
};
