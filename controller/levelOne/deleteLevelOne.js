import { checkExistence, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId } = context.req.user;

	const levelOne = await checkExistence({
		tableRef: 'levelOne',
		entityKey: 'id',
		entityValue: id,
		title: 'Record',
		account: userId
	});

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
