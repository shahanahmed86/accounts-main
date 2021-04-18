import { ApolloError } from 'apollo-server-express';
import { checkData } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, role } = context.req.user;
	switch (role) {
		case 'admin': {
			return checkData({ tableRef: 'levelThree', key: 'id', value: id, title: 'Account' });
		}
		case 'account': {
			return checkData({
				tableRef: 'levelThree',
				key: 'id',
				value: id,
				title: 'Account',
				pKey: role,
				pValue: userId,
				checkSuspension: true
			});
		}
		default: {
			throw new ApolloError("You aren't allow to view such information...");
		}
	}
};
