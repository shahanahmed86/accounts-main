import { checkData, prisma, validation } from '../../utils';

export default async (parent, { debitInputs, creditInputs, ...data }, context, info) => {
	const { id: userId, userType } = context.req.user;

	await Promise.all(
		debitInputs.map(async ({ headId }) => {
			await checkData({
				tableRef: 'levelFour',
				key: 'id',
				value: headId,
				title: 'Account',
				pKey: userType,
				pValue: userId,
				checkSuspension: true
			});
		})
	);

	data.account = {
		connect: { id: userId }
	};

	// const createdTransaction;

	return {
		success: true,
		message: `Transaction created successfully...`
		// debugMessage: createdTransaction.id
	};
};
