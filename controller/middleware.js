import { AuthenticationError } from 'apollo-server-express';
import { checkData, getDecodedToken } from '../utils';

export const checkAuth = async (parent, { shouldAdmin, shouldAccount, doNotThrow }, { req, res }) => {
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
				admin.password = null;
				admin.userType = 'admin';

				req.user = admin;
			} else if (shouldAccount && 'accountId' in decoded) {
				const account = await checkData({
					tableRef: 'account',
					key: 'id',
					value: decoded.accountId,
					title: 'Account',
					checkSuspension: true
				});
				account.password = null;
				account.userType = 'account';

				req.user = account;
			} else {
				throw new AuthenticationError("You aren't authorize for such actions...");
			}
		}
	} catch (error) {
		throw new AuthenticationError(error.message);
	}
};

export const checkGuest = (parent, args, { req, res }) => {
	try {
		if (req.headers['authorization']) {
			throw new AuthenticationError('You have an active login session...');
		}
	} catch (error) {
		throw new AuthenticationError(error.message);
	}
};
