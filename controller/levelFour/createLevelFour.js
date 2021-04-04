import { checkData, prisma, validation } from '../../utils';

export default async (parent, { levelThreeId, ...data }, context, info) => {
	await validation.nameSchema.validateAsync(data.name);

	const { id: userId, userType } = context.req.user;

	await checkData({
		tableRef: 'levelThree',
		key: 'id',
		value: levelThreeId,
		title: 'Account',
		pKey: userType,
		pValue: userId,
		checkSuspension: true
	});

	data.levelThree = {
		connect: { id: levelThreeId }
	};

	await checkData({
		tableRef: 'levelFour',
		key: 'name',
		value: data.name,
		title: data.name,
		pKey: 'levelThree',
		pValue: levelThreeId,
		checkDuplication: true
	});

	data.account = {
		connect: { id: userId }
	};

	const createdLevel = await prisma.levelFour.create({ data });

	return {
		success: true,
		message: `${data.name} created successfully...`,
		debugMessage: createdLevel.id
	};
};
