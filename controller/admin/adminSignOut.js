import { AuthenticationError } from 'apollo-server-express';

export default async (parent, args, context) => {
	try {
		if (!'adminId' in context.req.session) throw new AuthenticationError("You've already logged out...");
		delete context.req.session.adminId;
		return true;
	} catch (error) {
		console.error(error);
		throw new AuthenticationError(error.message);
	}
};
