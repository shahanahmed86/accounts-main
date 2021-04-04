import { checkData, prisma, validation } from '../../utils';

export default async (parent, data, context, info) => {
	await validation.levelSchema.validateAsync({ name: data.name, nature: data.nature }, { abortEarly: 'false' });

	const { id: userId, userType } = context.req.user;

	await Promise.all(
		Object.keys(data).map((key) => {
			return checkData({
				tableRef: 'levelOne',
				key,
				value: data[key],
				title: data[key],
				pKey: userType,
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
};
