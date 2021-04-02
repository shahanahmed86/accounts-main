import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const account = await checkData({ tableRef: 'account', key: 'id', value: id, title: 'Account' });

	if (account.isSuspended) {
		return {
			success: true,
			message: 'Account is already been deleted...'
		};
	}
	await prisma.account.update({ where: { id }, data: { isSuspended: true } });

	return {
		success: true,
		message: 'Account deleted successfully...'
	};
};
