import { AuthenticationError } from 'apollo-server-errors';

export default (parent, args, { req, res, next }) => {
	const isRest = typeof next === 'function';
	try {
		if (req.headers['authorization']) {
			throw new ApolloError('You have an active login session...');
		}
		if (isRest) next();
	} catch (error) {
		if (isRest) return res.status(400).send(error.message);
		throw new AuthenticationError(error);
	}
};
