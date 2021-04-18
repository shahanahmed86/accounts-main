import { checkData, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	try {
		const { id: userId, role } = context.req.user;

		const where = { tableRef: 'levelThree', key: 'id', value: id, title: 'Account' };
		if (role !== 'admin') {
			where.pKey = role;
			where.pValue = userId;
		}
		const levelThree = await checkData(where);

		if (data.isSuspended === false) {
			if (role !== 'admin') {
				return {
					success: false,
					message: 'Only admin can restore such account...'
				};
			}
			if (levelThree.isSuspended === false) {
				return {
					success: false,
					message: `${data.name || levelThree.name} is already restored...`
				};
			}
		}

		levelThree.levelTwo = await prisma.levelThree.findUnique({ where: { id } }).levelTwo();

		if (data.name && data.name !== levelThree.name) {
			await validation.nameSchema.validateAsync(data.name);

			await checkData({
				tableRef: 'levelThree',
				key: 'name',
				value: data.name,
				title: data.name,
				pKey: 'levelTwo',
				pValue: levelThree.levelTwo.id,
				id,
				checkDuplication: true
			});
		}

		const updatedLevel = await prisma.levelThree.update({ where: { id }, data });

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
