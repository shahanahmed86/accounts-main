import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, role } = context.req.user;

	const transaction = await checkData({
		tableRef: 'transaction',
		key: 'id',
		value: id,
		title: 'Account',
		pKey: role,
		pValue: userId
	});

	if (transaction.isSuspended) {
		return {
			success: true,
			message: `${transaction.name} has already been deleted...`
		};
	}
	await prisma.transaction.update({ where: { id }, data: { isSuspended: true } });

	await maintainLogs(id);

	return {
		success: true,
		message: `${transaction.name} deleted successfully...`,
		debugMessage: id
	};
};
