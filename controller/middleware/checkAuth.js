import { AuthenticationError } from 'apollo-server-errors';
import { checkExistence, getDecodedToken } from '../../utils';

export default async (parent, { shouldAdmin, shouldAccount, doNotThrow }, { req, res, next }) => {
	const isRest = typeof next === 'function';
	try {
		const decoded = getDecodedToken(context.req, doNotThrow);
		if (decoded) {
			if (shouldAdmin && 'adminId' in decoded) {
				const admin = await checkExistence('admin', decoded.adminId, 'Admin');
				context.req.user = {
					...admin,
					userType: 'admin'
				};
			} else if (shouldAccount && 'accountId' in decoded) {
				const account = await checkExistence('account', decoded.accountId, 'Account', true);
				context.req.user = {
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
