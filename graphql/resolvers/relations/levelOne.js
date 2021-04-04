import { checkData, filterRelationData } from '../../../utils';

export default {
	async levelTwos({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'levelOne', id, ref: 'levelTwos' });
	},
	async account({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'levelOne', id, ref: 'account', isRefSingle: true });
	}
};
