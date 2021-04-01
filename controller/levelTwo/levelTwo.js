import { ApolloError } from 'apollo-server-errors';
import { checkExistence, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, userType } = context.req.user;
	switch (userType) {
		case 'admin': {
			return checkExistence({ tableRef: 'levelTwo', entityKey: 'id', entityValue: id, title: 'Account' });
		}
		case 'account': {
			return checkExistence({
				tableRef: 'levelOne',
				entityKey: 'id',
				entityValue: id,
				title: 'Account',
				parentKey: 'account',
				parentValue: userId,
				checkSuspension: true
			});
		}
		default: {
			throw new ApolloError("You aren't allow to view such information...");
		}
	}
};
