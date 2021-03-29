import { accountController } from '../../../controller';

export default {
	loggedInAccount: (...args) => accountController.loggedInAccount(...args),
	accounts: (...args) => accountController.accounts(...args),
	account: (...args) => accountController.account(...args)
};
