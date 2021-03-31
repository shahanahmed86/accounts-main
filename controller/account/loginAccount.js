import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';
import { checkExistence, prisma, validation } from '../../utils';
import { JWT_SECRET } from '../../config';

export default async (parent, { username, password }) => {
	await validation.signInSchema.validateAsync({ username, password }, { abortEarly: 'false' });

	const user = await prisma.account.findUnique({ where: { username } });
	if (!user) throw new AuthenticationError(`User not found...`);

	await checkExistence({
		tableRef: 'account',
		entityKey: 'id',
		entityValue: user.id,
		title: 'Account',
		checkSuspension: true
	});

	if (!compareSync(password, user.password)) throw new AuthenticationError('Password mismatched...');

	return {
		token: jwt.sign({ accountId: user.id }, JWT_SECRET),
		user
	};
};
