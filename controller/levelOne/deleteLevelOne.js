import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, role } = context.req.user;

	const levelOne = await checkData({
		tableRef: 'levelOne',
		key: 'id',
		value: id,
		title: 'Account',
		pKey: role,
		pValue: userId
	});

	if (levelOne.isSuspended) {
		return {
			success: true,
			message: 'Account has already been deleted...'
		};
	}
	await prisma.levelOne.update({ where: { id }, data: { isSuspended: true } });

	return {
		success: true,
		message: `${levelOne.name} deleted successfully...`,
		debugMessage: id
	};
};
