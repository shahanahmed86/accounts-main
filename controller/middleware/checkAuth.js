import { AuthenticationError } from 'apollo-server-errors';
import { checkExistence, getDecodedToken } from '../../utils';

export default async (parent, { shouldAdmin, shouldAccount, doNotThrow }, { req, res, next }) => {
	const isRest = typeof next === 'function';
	try {
		const decoded = getDecodedToken(req, doNotThrow);
		if (decoded) {
			if (shouldAdmin && 'adminId' in decoded) {
				const admin = await checkExistence({
					tableRef: 'admin',
					entityKey: 'id',
					entityValue: decoded.adminId,
					title: 'Admin'
				});
				req.user = {
					...admin,
					userType: 'admin'
				};
			} else if (shouldAccount && 'accountId' in decoded) {
				const account = await checkExistence({
					tableRef: 'account',
					entityKey: 'id',
					entityValue: decoded.accountId,
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
		throw new AuthenticationError(error);
	}
};
