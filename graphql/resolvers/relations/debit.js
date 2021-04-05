import { filterRelationData } from '../../../utils';

export default {
	async head({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'debit',
			id,
			ref: 'head',
			isRefSingle: true
		});
	},
	async transaction({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'debit',
			id,
			ref: 'transaction',
			isRefSingle: true
		});
	},
	async account({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'debit',
			id,
			ref: 'account',
			isRefSingle: true
		});
	}
};
