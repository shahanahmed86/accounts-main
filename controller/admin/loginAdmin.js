import { compareSync } from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';
import { prisma, validation } from '../../utils';

export default async (parent, { username, password }, context) => {
	try {
		await validation.usernameSchema.validateAsync(username);

		const admin = await prisma.admin.findUnique({ where: { username } });

		if (!admin || !compareSync(password, admin.password)) {
			throw new AuthenticationError('Incorrect username or password. Please try again.');
		}

		context.req.session.adminId = admin.id;

		admin.role = 'admin';
		return admin;
	} catch (error) {
		console.error(error);
		throw new AuthenticationError(error.message);
	}
};
