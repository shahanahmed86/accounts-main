import Joi from 'joi';
import { hashSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkDuplication, prisma, saveFile, validation } from '../../utils';

export default async (parent, { password, avatar, ...data }, context, info) => {
	await Joi.validate({ ...data, password }, validation.accountObject, { abortEarly: false });

	await checkDuplication('account', 'username', data.username, 'Username');

	data.password = hashSync(password, BCRYPT_SALT);

	data.avatar = await saveFile(avatar);

	await prisma.account.create({ data });

	return {
		success: true,
		message: 'Account created successfully...'
	};
};
