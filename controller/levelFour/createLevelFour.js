import { checkData, prisma, validation } from '../../utils';

export default async (parent, { levelThreeId, ...data }, context, info) => {
	try {
		await validation.nameSchema.validateAsync(data.name);

		const { id: userId, role } = context.req.user;

		await checkData({
			tableRef: 'levelThree',
			key: 'id',
			value: levelThreeId,
			title: 'Account',
			pKey: role,
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
	} catch (error) {
		console.error(error);
		return {
			success: true,
			message: `${data.name} not created...`,
			debugMessage: error.message
		};
	}
};
