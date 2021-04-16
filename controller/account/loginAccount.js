import { compareSync } from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';
import { prisma, validation } from '../../utils';

export default async (parent, { username, password }, context) => {
	try {
		await validation.usernameSchema.validateAsync(username);

		const account = await prisma.account.findUnique({ where: { username } });
		if (!account || !compareSync(password, account.password)) {
			throw new AuthenticationError('Incorrect username or password. Please try again.');
		}

		context.req.session.accountId = account.id;

		return account;
	} catch (error) {
		console.error(error);
		throw new AuthenticationError(error.message);
	}
};
