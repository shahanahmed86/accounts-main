import { AuthenticationError } from 'apollo-server-express';
import { checkData, ensureSignedIn, ensureSignedOut } from '../utils';

export const checkAuth = async (parent, { shouldAdmin, shouldAccount, doNotThrow }, { req, res }) => {
	try {
		if (shouldAdmin && 'adminId' in req.session) {
			ensureSignedIn(req, doNotThrow, 'adminId');
			const admin = await checkData({
				tableRef: 'admin',
				key: 'id',
				value: req.session.adminId,
				title: 'Admin'
			});
			admin.password = null;
			admin.role = 'admin';

			req.user = admin;
		} else if (shouldAccount && 'accountId' in req.session) {
			ensureSignedIn(req, doNotThrow, 'accountId');
			const account = await checkData({
				tableRef: 'account',
				key: 'id',
				value: req.session.accountId,
				title: 'Account',
				checkSuspension: true
			});
			account.password = null;
			account.role = 'account';

			req.user = account;
		} else {
			throw new AuthenticationError('You must be logged in...');
		}
	} catch (error) {
		throw new AuthenticationError(error.message);
	}
};

export const checkGuest = (parent, { shouldAdmin, shouldAccount }, { req, res }) => {
	try {
		if (shouldAdmin && 'adminId' in req.session) ensureSignedOut(req, 'adminId');

		if (shouldAccount && 'accountId' in req.session) ensureSignedOut(req, 'accountId');
	} catch (error) {
		throw new AuthenticationError(error.message);
	}
};
