import { transactionController } from '../../../controller';

export default {
	transactions: (...args) => transactionController.transactions(...args),
	transaction: (...args) => transactionController.transaction(...args)
};
