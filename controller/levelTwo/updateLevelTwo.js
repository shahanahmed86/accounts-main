import { ApolloError } from 'apollo-server-errors';
import { checkDuplication, checkExistence, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	const { id: userId, userType } = context.req.user;

	const levelTwo = await checkExistence({ tableRef: 'levelTwo', entityKey: 'id', entityValue: id, title: 'Account' });
	levelTwo.account = await prisma.levelTwo.findUnique({ where: { id } }).account();

	if (userType === 'account') {
		if (data.isSuspended === true) {
			throw new ApolloError('Only admin can restore the deleted account...');
		}
		if (levelTwo.account.id !== userId) throw new ApolloError('Invalid account...');
	}

	levelTwo.levelOne = await prisma.levelTwo.findUnique({ where: { id } }).levelOne();

	if (data.name && data.name !== levelTwo.name) {
		await validation.nameSchema.validateAsync(data.name);

		await checkDuplication({
			tableRef: 'levelTwo',
			entityKey: 'name',
			entityValue: data.name,
			title: data.name,
			parentKey: 'levelOne',
			parentValue: levelTwo.levelOne.id,
			id
		});
	}

	await prisma.levelTwo.update({ where: { id }, data });

	return {
		success: true,
		message: `${data.name} updated successfully...`,
		debugMessage: id
	};
};
