import { ApolloError } from 'apollo-server-express';
import { checkDebitOrCreditRows, prisma, maintainLogs, checkData } from '../../utils';

export default async (parent, { id, debitInputs, creditInputs, ...data }, context, info) => {
	const { id: userId, userType } = context.req.user;

	await checkData({
		tableRef: 'transaction',
		key: 'id',
		value: id,
		title: 'Transaction',
		pKey: userType,
		pValue: userId,
		checkSuspension: true
	});

	await checkDebitOrCreditRows(debitInputs, userType, userId);

	await checkDebitOrCreditRows(creditInputs, userType, userId);

	const debitTotal = debitInputs.reduce((acc, cur) => (acc += cur.amount), 0);
	const creditTotal = creditInputs.reduce((acc, cur) => (acc += cur.amount), 0);
	if (debitTotal !== creditTotal) throw new ApolloError('Footing is not matched...');

	const createDebitInputs = debitInputs.filter(({ id, amount }) => !id && amount > 0);
	const updateDebitInputs = debitInputs.filter(({ id, amount }) => id && amount > 0);
	const deleteDebitInputs = debitInputs.filter(({ id, amount }) => id && amount <= 0);
	data.debits = {
		create: createDebitInputs.map(({ id, headId, ...input }) => ({
			head: { connect: { id: headId } },
			...input
		})),
		update: updateDebitInputs.map(({ id, headId, ...data }) => ({ where: { id }, data })),
		delete: deleteDebitInputs.map(({ id }) => ({ where: { id } }))
	};

	const createCreditInputs = creditInputs.filter(({ id, amount }) => !id && amount > 0);
	const updateCreditInputs = creditInputs.filter(({ id, amount }) => id && amount > 0);
	const deleteCreditInputs = creditInputs.filter(({ id, amount }) => id && amount <= 0);
	data.credits = {
		create: createCreditInputs.map(({ id, headId, ...input }) => ({
			head: { connect: { id: headId } },
			...input
		})),
		update: updateCreditInputs.map(({ id, headId, ...data }) => ({ where: { id }, data })),
		delete: deleteCreditInputs.map(({ id }) => ({ where: { id } }))
	};

	await prisma.transaction.update({ where: { id }, data });

	await maintainLogs(id);

	return {
		success: true,
		message: `Transaction created successfully...`,
		debugMessage: id
	};
};
