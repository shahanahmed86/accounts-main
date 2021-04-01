import { checkDuplication, checkExistence, prisma, validation } from '../../utils';

export default async (parent, data, context, info) => {
	await validation.nameSchema.validateAsync(data.name);

	const { id: userId } = context.req.user;

	await checkExistence({
		tableRef: 'levelTwo',
		entityKey: 'levelOne',
		entityValue: data.levelOneId,
		title: 'Account',
		parentKey: 'account',
		parentValue: userId,
		checkSuspension: true
	});

	await checkDuplication({
		tableRef: 'levelTwo',
		entityKey: 'name',
		entityValue: data.name,
		title: data.name,
		parentKey: 'levelOneId',
		parentValue: data.levelOneId
	});

	data.account = {
		connect: { id: userId }
	};

	const createdLevel = await prisma.levelTwo.create({ data });

	return {
		success: true,
		message: `${data.name} created successfully...`,
		debugMessage: createdLevel.id
	};
};
