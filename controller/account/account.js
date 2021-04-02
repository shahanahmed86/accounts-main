import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	return checkData({ tableRef: 'account', key: 'id', value: id, title: 'Account' });
};
