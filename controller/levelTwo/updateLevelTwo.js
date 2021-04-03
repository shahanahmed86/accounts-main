import { ApolloError } from 'apollo-server-express';
import { checkData, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	const { id: userId, userType } = context.req.user;

	const where = { tableRef: 'levelTwo', key: 'id', value: id, title: 'Account' };
	if (userType !== 'admin') where.isSuspended = false;

	const levelTwo = await checkData(where);
	levelTwo.account = await prisma.levelTwo.findUnique({ where: { id } }).account();

	if (userType === 'account' && levelTwo.account.id !== userId)
		throw new ApolloError('Invalid account...');

	levelTwo.levelOne = await prisma.levelTwo.findUnique({ where: { id } }).levelOne();

	if (data.name && data.name !== levelTwo.name) {
		await validation.nameSchema.validateAsync(data.name);

		await checkData({
			tableRef: 'levelTwo',
			key: 'name',
			value: data.name,
			title: data.name,
			pKey: 'levelOne',
			pValue: levelTwo.levelOne.id,
			id,
			isDuplicated: true
		});
	}

	await prisma.levelTwo.update({ where: { id }, data });

	return {
		success: true,
		message: `${data.name} updated successfully...`,
		debugMessage: id
	};
};
