import { ApolloError } from 'apollo-server-express';
import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, userType } = context.req.user;
	switch (userType) {
		case 'admin': {
			return checkData({ tableRef: 'levelTwo', key: 'id', value: id, title: 'Account' });
		}
		case 'account': {
			return checkData({
				tableRef: 'levelOne',
				key: 'id',
				value: id,
				title: 'Account',
				pKey: 'account',
				pValue: userId,
				isSuspended: true
			});
		}
		default: {
			throw new ApolloError("You aren't allow to view such information...");
		}
	}
};
