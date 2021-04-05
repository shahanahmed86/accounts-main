import { filterRelationData } from '../../../utils';

export default {
	async head({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'credit',
			id,
			ref: 'head',
			isRefSingle: true
		});
	},
	async transaction({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'credit',
			id,
			ref: 'transaction',
			isRefSingle: true
		});
	},
	async account({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'credit',
			id,
			ref: 'account',
			isRefSingle: true
		});
	}
};
