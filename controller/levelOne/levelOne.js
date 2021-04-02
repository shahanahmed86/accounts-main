import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	return checkData({ tableRef: 'levelOne', id, title: 'Account' });
};
