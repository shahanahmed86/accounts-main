import admin from './admin';
import account from './account';
import levelOne from './levelOne';
import levelTwo from './levelTwo';

export default {
	...admin,
	...account,
	...levelOne,
	...levelTwo
};
