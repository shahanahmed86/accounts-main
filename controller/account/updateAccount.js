import Joi from 'joi';
import { hashSync, compareSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkDuplication, checkExistence, prisma, saveFile, validation } from '../../utils';

export default async (parent, { id, password, avatar, ...data }, context, info) => {
	const account = await checkExistence('account', id, 'Account');

	if (data.username !== account.username) {
		await Joi.validate(username, validation.usernameSchema, { abortEarly: false });

		await checkDuplication('account', 'username', data.username, 'Username', id);
	}

	if (password && !compareSync(password, account.password)) {
		await Joi.validate(password, validation.passwordSchema, { abortEarly: false });

		data.password = hashSync(password, BCRYPT_SALT);
	}

	if (data.name) await Joi.validate(data.name, validation.nameSchema, { abortEarly: false });

	if (avatar && typeof avatar === 'object') {
		data.avatar = await saveFile(avatar, account.avatar);
	}

	await prisma.account.update({ where: { id }, data });

	return {
		success: true,
		message: 'Account updated successfully...'
	};
};
