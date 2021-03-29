import { hashSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkDuplication, isContainSpaces, prisma, saveFile } from '../../utils';

export default async (parent, { password, avatar, ...data }, context, info) => {
	isContainSpaces(data.username);

	await checkDuplication('account', 'username', data.username, 'Username');

	data.password = hashSync(password, BCRYPT_SALT);

	data.avatar = await saveFile(avatar);

	await prisma.account.create({ data });

	return {
		success: true,
		message: 'Account created successfully...'
	};
};
