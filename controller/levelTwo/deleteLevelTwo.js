import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId } = context.req.user;

	const levelTwo = await checkData({
		tableRef: 'levelTwo',
		key: 'id',
		value: id,
		title: 'Account',
		pKey: 'account',
		pValue: userId
	});

	if (levelTwo.isSuspended) {
		return {
			success: true,
			message: 'Account is already been deleted...'
		};
	}

	await prisma.levelTwo.update({ where: { id }, data: { isSuspended: true } });

	return {
		success: true,
		message: `${data.name} updated successfully...`
	};
};
