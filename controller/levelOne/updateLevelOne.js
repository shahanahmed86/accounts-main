import { checkData, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	try {
		const { id: userId, userType } = context.req.user;

		const where = { tableRef: 'levelOne', key: 'id', value: id, title: 'Account' };
		if (userType !== 'admin') {
			where.pKey = userType;
			where.pValue = userId;
		}
		const levelOne = await checkData(where);

		if (data.isSuspended === false) {
			if (userType !== 'admin') {
				return {
					success: false,
					message: 'Only admin can restore such account...'
				};
			}
			if (levelOne.isSuspended === false) {
				return {
					success: false,
					message: `${data.name || levelOne.name} is already restored...`
				};
			}
		}

		levelOne.account = await prisma.levelOne.findUnique({ where: { id } }).account();

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
				checkDuplication: true
			});
		}

		const updatedLevel = await prisma.levelOne.update({ where: { id }, data });

		return {
			success: true,
			message: `${data.name || updatedLevel.name} updated successfully...`,
			debugMessage: id
		};
	} catch (error) {
		console.error(error);
		return {
			success: true,
			message: `${data.name || 'Account'} not updated...`,
			debugMessage: error.message
		};
	}
};
