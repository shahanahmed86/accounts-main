import { ApolloError } from 'apollo-server-express';
import { prisma } from '../../utils';

export default (parent, args, context, info) => {
	const { id: userId, role } = context.req.user;
	switch (role) {
		case 'admin': {
			return prisma.transaction.findMany();
		}
		case 'account': {
			return prisma.transaction.findMany({
				where: { account: { id: userId }, isSuspended: false }
			});
		}
		default: {
			throw new ApolloError("You aren't allow to view such information...");
		}
	}
};
