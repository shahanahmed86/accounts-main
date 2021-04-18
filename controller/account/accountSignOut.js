import { AuthenticationError } from 'apollo-server-express';
import { signOut } from '../../utils/auth';

export default async (parent, args, context) => {
	try {
		if (!'accountId' in context.req.session) throw new AuthenticationError("You've already logged out...");

		if ('adminId' in context.req.session) delete context.req.session.accountId;
		else await signOut(context.req, context.res);

		return true;
	} catch (error) {
		console.error(error);
		throw new AuthenticationError(error.message);
	}
};
