import { levelOneController } from '../../../controller';

export default {
	createLevelOne: (...args) => levelOneController.createLevelOne(...args),
	updateLevelOne: (...args) => levelOneController.updateLevelOne(...args),
	deleteLevelOne: (...args) => levelOneController.deleteLevelOne(...args)
};
