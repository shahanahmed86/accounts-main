import { checkData, prisma, validation } from '../../utils';

export default async (parent, { levelOneId, ...data }, context, info) => {
	try {
		await validation.nameSchema.validateAsync(data.name);

		const { id: userId, userType } = context.req.user;

		await checkData({
			tableRef: 'levelOne',
			key: 'id',
			value: levelOneId,
			title: 'Account',
			pKey: userType,
			pValue: userId,
			checkSuspension: true
		});

		data.levelOne = {
			connect: { id: levelOneId }
		};

		await checkData({
			tableRef: 'levelTwo',
			key: 'name',
			value: data.name,
			title: data.name,
			pKey: 'levelOne',
			pValue: levelOneId,
			checkDuplication: true
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
	} catch (error) {
		console.error(error);
		return {
			success: true,
			message: `${data.name} not created...`,
			debugMessage: error.message
		};
	}
};
