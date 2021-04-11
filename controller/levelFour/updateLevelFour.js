import { checkData, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	try {
		const { id: userId, userType } = context.req.user;

		const where = { tableRef: 'levelFour', key: 'id', value: id, title: 'Account' };
		if (userType !== 'admin') {
			where.pKey = userType;
			where.pValue = userId;
		}
		const levelFour = await checkData(where);

		if (data.isSuspended === false) {
			if (userType !== 'admin') {
				return {
					success: false,
					message: 'Only admin can restore such account...'
				};
			}
			if (levelFour.isSuspended === false) {
				return {
					success: false,
					message: `${data.name || levelFour.name} is already restored...`
				};
			}
		}

		levelFour.levelThree = await prisma.levelFour.findUnique({ where: { id } }).levelThree();

		if (data.name && data.name !== levelFour.name) {
			await validation.nameSchema.validateAsync(data.name);

			await checkData({
				tableRef: 'levelFour',
				key: 'name',
				value: data.name,
				title: data.name,
				pKey: 'levelThree',
				pValue: levelFour.levelThree.id,
				id,
				checkDuplication: true
			});
		}

		const updatedLevel = await prisma.levelFour.update({ where: { id }, data });

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
