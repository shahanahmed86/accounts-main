import { hashSync, compareSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkDuplication, checkExistence, isContainSpaces, prisma, saveFile } from '../../utils';

export default async (parent, { id, password, avatar, ...data }, context, info) => {
	const account = await checkExistence('account', id, 'Account');

	if (data.username !== account.username) {
		isContainSpaces(data.username);

		await checkDuplication('account', 'username', data.username, 'Username', id);
	}

	if (password && !compareSync(password, account.password)) {
		data.password = hashSync(password, BCRYPT_SALT);
	}

	if (avatar && typeof avatar === 'object') {
		data.avatar = await saveFile(avatar);
	}

	await prisma.account.update({ where: { id }, data });

	return {
		success: true,
		message: 'Account updated successfully...'
	};
};
