import { ApolloError } from 'apollo-server-errors';
import Joi from 'joi';
import { checkDuplication, checkExistence, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	const { id: userId, userType } = context.req.user;

	if (data.isSuspended === true && userType === 'account') {
		throw new ApolloError('Only admin can restore the deleted account...');
	}

	const levelOne = await checkExistence('levelOne', id, 'Record');

	if (data.name && data.name !== levelOne.name) {
		await Joi.validate(data.name, validation.nameSchema, { abortEarly: false });
		await checkDuplication('levelOne', 'name', data.name, 'Name', id);
	}

	if (data.nature && data.nature !== levelOne.nature) {
		await Joi.validate(data.nature, validation.natureSchema, { abortEarly: false });
	}

	data.account = {
		connect: { id: userId }
	};
	await prisma.levelOne.update({ where: { id }, data });

	return {
		success: true,
		message: `${data.name} updated successfully...`
	};
};
