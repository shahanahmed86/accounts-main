import { adminController } from '../../../controller';

export default {
	loggedInAdmin: (...args) => adminController.loggedInAdmin(...args)
};
