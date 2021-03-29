import { checkExistence, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const levelOne = await checkExistence('levelOne', id, 'Record');

	if (levelOne.isSuspended) {
		return {
			success: true,
			message: 'Record is already been deleted...'
		};
	}
	await prisma.levelOne.delete({ where: { id } });

	return {
		success: true,
		message: `${data.name} updated successfully...`
	};
};
