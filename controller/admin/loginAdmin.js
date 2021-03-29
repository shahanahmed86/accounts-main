import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';
import { prisma } from '../../utils';
import { JWT_SECRET } from '../../config';

export default async (parent, { username, password }) => {
	const user = await prisma.admin.findUnique({ where: { username } });
	if (!user) throw new AuthenticationError(`User not found...`);

	if (!compareSync(password, user.password)) throw new AuthenticationError('Password mismatched...');

	return {
		token: jwt.sign({ adminId: user.id }, JWT_SECRET),
		user
	};
};
