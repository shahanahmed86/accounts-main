import { checkData, prisma, validation } from '../../utils';

export default async (parent, data, context, info) => {
	try {
		await validation.levelSchema.validateAsync({ name: data.name, nature: data.nature }, { abortEarly: 'false' });

		const { id: userId, role } = context.req.user;

		await Promise.all(
			Object.keys(data).map((key) => {
				return checkData({
					tableRef: 'levelOne',
					key,
					value: data[key],
					title: data[key],
					pKey: role,
					pValue: userId,
					checkDuplication: true
				});
			})
		);

		data.account = {
			connect: { id: userId }
		};
		const createdLevel = await prisma.levelOne.create({ data });

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
