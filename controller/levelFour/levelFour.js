import { ApolloError } from 'apollo-server-express';
import { checkData } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, userType } = context.req.user;
	switch (userType) {
		case 'admin': {
			return checkData({ tableRef: 'levelFour', key: 'id', value: id, title: 'Account' });
		}
		case 'account': {
			return checkData({
				tableRef: 'levelFour',
				key: 'id',
				value: id,
				title: 'Account',
				pKey: userType,
				pValue: userId,
				checkSuspension: true
			});
		}
		default: {
			throw new ApolloError("You aren't allow to view such information...");
		}
	}
};
