import { accountController } from '../../../controller';

export default {
	createAccount: (...args) => accountController.createAccount(...args),
	updateAccount: (...args) => accountController.updateAccount(...args),
	deleteAccount: (...args) => accountController.deleteAccount(...args),
	loginAccount: (...args) => accountController.loginAccount(...args),
	accountSignOut: (...args) => accountController.accountSignOut(...args)
};
