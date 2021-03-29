import { checkDuplication, checkExistence, prisma } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	const { id: userId } = context.req.user;

	const levelOne = await checkExistence('levelOne', id, 'Record');

	if (data.name && data.name !== levelOne.name) {
		await checkDuplication('levelOne', 'name', data.name, 'Name');
	}

	data.account = {
		connect: { id: userId }
	};
	await prisma.levelOne.update({ where: { id }, data });

	return {
		success: true,
		message: `${data.name} updated successfully...`
	};
};
