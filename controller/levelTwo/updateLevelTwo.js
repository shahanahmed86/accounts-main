import { checkData, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	try {
		const { id: userId, role } = context.req.user;

		const where = { tableRef: 'levelTwo', key: 'id', value: id, title: 'Account' };
		if (role !== 'admin') {
			where.pKey = role;
			where.pValue = userId;
		}
		const levelTwo = await checkData(where);

		if (data.isSuspended === false) {
			if (role !== 'admin') {
				return {
					success: false,
					message: 'Only admin can restore such account...'
				};
			}
			if (levelTwo.isSuspended === false) {
				return {
					success: false,
					message: `${data.name || levelTwo.name} is already restored...`
				};
			}
		}

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
				checkDuplication: true
			});
		}

		const updatedLevel = await prisma.levelTwo.update({ where: { id }, data });

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
