import Joi from 'joi';
import { checkDuplication, prisma, validation } from '../../utils';

export default async (parent, data, context, info) => {
	await Joi.validate({ name: data.name, nature: data.nature }, validation.levelObject, { abortEarly: false });

	const { id: userId } = context.req.user;

	await checkDuplication('levelOne', 'name', data.name, 'Name');

	data.account = {
		connect: { id: userId }
	};
	await prisma.levelOne.create({ data });

	return {
		success: true,
		message: `${data.name} created successfully...`
	};
};
