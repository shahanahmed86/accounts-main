import { AuthenticationError } from 'apollo-server-express';

export default async (parent, args, context) => {
	try {
		if (!'accountId' in context.req.session) throw new AuthenticationError("You've already logged out...");
		delete context.req.session.accountId;
		return true;
	} catch (error) {
		console.error(error);
		throw new AuthenticationError(error.message);
	}
};
