import { checkData, prisma, validation } from '../../utils';

export default async (parent, data, context, info) => {
	await validation.nameSchema.validateAsync(data.name);

	const { id: userId } = context.req.user;

	await checkData({
		tableRef: 'levelTwo',
		key: 'levelOne',
		value: data.levelOneId,
		title: 'Account',
		pKey: 'account',
		pValue: userId,
		isSuspended: true
	});

	await checkData({
		tableRef: 'levelTwo',
		key: 'name',
		value: data.name,
		title: data.name,
		pKey: 'levelOneId',
		pValue: data.levelOneId,
		isDuplicated: true
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
