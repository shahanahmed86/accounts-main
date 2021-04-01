import { checkDuplication, prisma, validation } from '../../utils';

export default async (parent, data, context, info) => {
	await validation.levelSchema.validateAsync({ name: data.name, nature: data.nature }, { abortEarly: 'false' });

	const { id: userId } = context.req.user;

	await Promise.all(
		Object.keys(data).map((key) => {
			return checkDuplication({
				tableRef: 'levelOne',
				entityKey: key,
				entityValue: data[key],
				title: data[key],
				parentKey: 'account',
				parentValue: userId
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
