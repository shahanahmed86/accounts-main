import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';
import { prisma } from '../utils';
import { JWT_SECRET } from '../config';

export default {
	loggedInAdmin(parent, args, context, info) {
		return context.req.user;
	},
	async loginAdmin(parent, { username, password }) {
		const admin = await prisma.admin.findUnique({ where: { username } });
		if (!admin) throw new AuthenticationError(`User not found...`);

		const passwordValid = bcrypt.compareSync(password, admin.password);
		if (!passwordValid) throw new AuthenticationError('Password mismatched...');

		return {
			token: jwt.sign({ adminId: admin.id }, JWT_SECRET),
			admin
		};
	}
};
