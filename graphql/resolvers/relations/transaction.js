import { filterRelationData } from '../../../utils';

export default {
	async debits({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'transaction',
			id,
			ref: 'debits',
			checkSuspension: false
		});
	},
	async credits({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'transaction',
			id,
			ref: 'credits',
			checkSuspension: false
		});
	},
	async account({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'transaction',
			id,
			ref: 'account',
			isRefSingle: true
		});
	}
};
