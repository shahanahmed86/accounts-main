import { transactionController } from '../../../controller';

export default {
	createTransaction: (...args) => transactionController.createTransaction(...args),
	updateTransaction: (...args) => transactionController.updateTransaction(...args),
	deleteTransaction: (...args) => transactionController.deleteTransaction(...args)
};
