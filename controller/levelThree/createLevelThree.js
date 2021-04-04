import { checkData, prisma, validation } from '../../utils';

export default async (parent, { levelTwoId, ...data }, context, info) => {
	await validation.nameSchema.validateAsync(data.name);

	const { id: userId, userType } = context.req.user;

	await checkData({
		tableRef: 'levelTwo',
		key: 'id',
		value: levelTwoId,
		title: 'Account',
		pKey: userType,
		pValue: userId,
		checkSuspension: true
	});

	data.levelTwo = {
		connect: { id: levelTwoId }
	};

	await checkData({
		tableRef: 'levelThree',
		key: 'name',
		value: data.name,
		title: data.name,
		pKey: 'levelTwo',
		pValue: levelTwoId,
		checkDuplication: true
	});

	data.account = {
		connect: { id: userId }
	};

	const createdLevel = await prisma.levelThree.create({ data });

	return {
		success: true,
		message: `${data.name} created successfully...`,
		debugMessage: createdLevel.id
	};
};
