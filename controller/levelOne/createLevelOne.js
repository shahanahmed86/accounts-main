import { checkDuplication, prisma } from '../../utils';

export default async (parent, data, context, info) => {
	const { id: userId } = context.req.user;

	await checkDuplication('levelOne', 'name', data.name, 'Name');

	data.account = {
		connect: { id: userId }
	};
	await prisma.levelOne.create({ data });

	return {
		success: true,
		message: `${data.name} created successfully...`
	};
};
