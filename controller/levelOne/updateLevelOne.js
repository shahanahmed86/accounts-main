import { ApolloError } from 'apollo-server-errors';
import { checkDuplication, checkExistence, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	const { userType } = context.req.user;

	if (data.isSuspended === true && userType === 'account') {
		throw new ApolloError('Only admin can restore the deleted account...');
	}

	const levelOne = await checkExistence({ tableRef: 'levelOne', entityKey: 'id', entityValue: id, title: 'Record' });
	levelOne.account = await prisma.levelOne.findUnique({ where: { id } }).account();

	if (data.name && data.name !== levelOne.name) {
		await validation.nameSchema.validateAsync(data.name);

		await checkDuplication({ tableRef: 'levelOne', entityKey: 'name', entityValue: data.name, title: 'Name', id });
	}

	await prisma.levelOne.update({ where: { id }, data });

	return {
		success: true,
		message: `${data.name} updated successfully...`,
		debugMessage: id
	};
};
