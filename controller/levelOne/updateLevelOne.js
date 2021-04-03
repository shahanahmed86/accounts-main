import { ApolloError } from 'apollo-server-express';
import { checkData, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	const { id: userId, userType } = context.req.user;

	const where = { tableRef: 'levelOne', key: 'id', value: id, title: 'Account' };
	if (userType !== 'admin') where.isSuspended = false;
	const levelOne = await checkData(where);
	levelOne.account = await prisma.levelOne.findUnique({ where: { id } }).account();

	if (userType === 'account' && levelOne.account.id !== userId)
		throw new ApolloError('Invalid account...');

	if (data.name && data.name !== levelOne.name) {
		await validation.nameSchema.validateAsync(data.name);

		await checkData({
			tableRef: 'levelOne',
			key: 'name',
			value: data.name,
			title: data.name,
			pKey: 'account',
			pValue: levelOne.account.id,
			id,
			isDuplicated: true
		});
	}

	await prisma.levelOne.update({ where: { id }, data });

	return {
		success: true,
		message: `${levelOne.name} updated successfully...`,
		debugMessage: id
	};
};
