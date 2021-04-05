import { ApolloError } from 'apollo-server-errors';
import { checkDebitOrCreditRows, prisma, maintainLogs } from '../../utils';

export default async (parent, { debitInputs, creditInputs, ...data }, context, info) => {
	const { id: userId, userType } = context.req.user;

	await checkDebitOrCreditRows(debitInputs, userType, userId);

	await checkDebitOrCreditRows(creditInputs, userType, userId);

	const debitTotal = debitInputs.reduce((acc, cur) => (acc += cur.amount), 0);
	const creditTotal = creditInputs.reduce((acc, cur) => (acc += cur.amount), 0);
	if (debitTotal !== creditTotal) throw new ApolloError('Footing is not matched...');

	data.account = {
		connect: { id: userId }
	};

	data.debits = {
		create: debitInputs
			.filter((input) => input.amount > 0)
			.map(({ id, headId, ...input }) => ({
				head: { connect: { id: headId } },
				account: { connect: { id: userId } },
				...input
			}))
	};

	data.credits = {
		create: creditInputs
			.filter((input) => input.amount > 0)
			.map(({ id, headId, ...input }) => ({
				head: { connect: { id: headId } },
				account: { connect: { id: userId } },
				...input
			}))
	};

	const createdTransaction = await prisma.transaction.create({ data });

	await maintainLogs(createdTransaction.id);

	return {
		success: true,
		message: `Transaction created successfully...`,
		debugMessage: createdTransaction.id
	};
};
