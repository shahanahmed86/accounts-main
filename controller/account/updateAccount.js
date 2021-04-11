import { hashSync, compareSync } from 'bcryptjs';
import { BCRYPT_SALT } from '../../config';
import { checkData, prisma, saveFile, validation } from '../../utils';

export default async (parent, { id, password, avatar, ...data }, context, info) => {
	try {
		const account = await checkData({ tableRef: 'account', key: 'id', value: id, title: 'Account' });

		if (data.isSuspended === false && account.isSuspended === false) {
			return {
				success: false,
				message: 'The account is already restored...'
			};
		}

		if (data.username && data.username !== account.username) {
			await validation.usernameSchema.validateAsync(data.username);

			await checkData({
				tableRef: 'account',
				key: 'username',
				value: data.username,
				title: data.username,
				id,
				checkDuplication: true
			});
		}

		if (password && !compareSync(password, account.password)) {
			await validation.passwordSchema.validateAsync(password);

			data.password = hashSync(password, BCRYPT_SALT);
		}

		if (data.name) await validation.nameSchema.validateAsync(data.name);

		if (data.email && data.email !== account.email) await emailValidator(data.email);

		if (data.cell && data.cell !== account.cell) await validation.cellSchema.validateAsync(data.cell);

		if (avatar && typeof avatar === 'object') {
			data.avatar = await saveFile(avatar, account.avatar);
		}

		await prisma.account.update({ where: { id }, data });

		return {
			success: true,
			message: 'Account updated successfully...',
			debugMessage: id
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Account not updated...',
			debugMessage: error.message
		};
	}
};
