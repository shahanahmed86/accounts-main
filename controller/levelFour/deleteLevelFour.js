import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, role } = context.req.user;

	const levelFour = await checkData({
		tableRef: 'levelFour',
		key: 'id',
		value: id,
		title: 'Account',
		pKey: role,
		pValue: userId
	});

	if (levelFour.isSuspended) {
		return {
			success: true,
			message: `${levelFour.name} has already been deleted...`
		};
	}
	await prisma.levelFour.update({ where: { id }, data: { isSuspended: true } });

	return {
		success: true,
		message: `${levelFour.name} deleted successfully...`,
		debugMessage: id
	};
};
