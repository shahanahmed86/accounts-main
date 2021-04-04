import { hashSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkData, prisma, saveFile, validation } from '../../utils';

export default async (parent, { password, avatar, ...data }, context, info) => {
	await validation.accountSchema.validateAsync({ ...data, password }, { abortEarly: 'false' });

	await checkData({
		tableRef: 'account',
		key: 'username',
		value: data.username,
		title: data.username,
		checkDuplication: true
	});

	data.password = hashSync(password, BCRYPT_SALT);

	data.avatar = await saveFile(avatar);

	const createdAccount = await prisma.account.create({ data });

	return {
		success: true,
		message: 'Account created successfully...',
		debugMessage: createdAccount.id
	};
};
