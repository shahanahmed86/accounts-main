import { hashSync, compareSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkDuplication, checkExistence, prisma, saveFile, validation } from '../../utils';

export default async (parent, { id, password, avatar, ...data }, context, info) => {
	const account = await checkExistence({ tableRef: 'account', entityKey: 'id', entityValue: id, title: 'Account' });

	if (data.username !== account.username) {
		await validation.usernameSchema.validateAsync(data.username);

		await checkDuplication({
			tableRef: 'account',
			entityKey: 'username',
			entityValue: data.username,
			title: 'Username',
			id
		});
	}

	if (password && !compareSync(password, account.password)) {
		await validation.passwordSchema.validateAsync(password);

		data.password = hashSync(password, BCRYPT_SALT);
	}

	if (data.name) await validation.nameSchema.validateAsync(data.name);

	if (avatar && typeof avatar === 'object') {
		data.avatar = await saveFile(avatar, account.avatar);
	}

	await prisma.account.update({ where: { id }, data });

	return {
		success: true,
		message: 'Account updated successfully...'
	};
};
