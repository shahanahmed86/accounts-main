import { hashSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkData, emailValidator, prisma, saveFile, validation } from '../../utils';

export default async (parent, { password, avatar, ...data }, context, info) => {
	try {
		await emailValidator(data.email);

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
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Account not created...',
			debugMessage: error.message
		};
	}
};
