import { hashSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkDuplication, prisma, saveFile, validation } from '../../utils';

export default async (parent, { password, avatar, ...data }, context, info) => {
	await validation.accountSchema.validateAsync({ ...data, password }, { abortEarly: 'false' });

	await checkDuplication({ tableRef: 'account', entityKey: 'username', entityValue: data.username, title: 'Username' });

	data.password = hashSync(password, BCRYPT_SALT);

	data.avatar = await saveFile(avatar);

	await prisma.account.create({ data });

	return {
		success: true,
		message: 'Account created successfully...'
	};
};
