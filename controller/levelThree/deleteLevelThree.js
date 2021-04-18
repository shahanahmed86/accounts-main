import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, role } = context.req.user;

	const levelThree = await checkData({
		tableRef: 'levelThree',
		key: 'id',
		value: id,
		title: 'Account',
		pKey: role,
		pValue: userId
	});

	if (levelThree.isSuspended) {
		return {
			success: true,
			message: `${levelThree.name} has already been deleted...`
		};
	}
	await prisma.levelThree.update({ where: { id }, data: { isSuspended: true } });

	return {
		success: true,
		message: `${levelThree.name} deleted successfully...`,
		debugMessage: id
	};
};
