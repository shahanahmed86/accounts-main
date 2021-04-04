import admin from './admin';
import account from './account';
import levelOne from './levelOne';
import levelTwo from './levelTwo';
import levelThree from './levelThree';
import levelFour from './levelFour';
import transaction from './transaction';

export default {
	...admin,
	...account,
	...levelOne,
	...levelTwo,
	...levelThree,
	...levelFour,
	...transaction
};
