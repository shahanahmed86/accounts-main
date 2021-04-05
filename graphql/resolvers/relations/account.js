import { filterRelationData } from '../../../utils';

export default {
	async password() {
		return null;
	},
	async levelOnes({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'account', id, ref: 'levelOnes' });
	},
	async levelTwos({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'account', id, ref: 'levelTwos' });
	},
	async levelThrees({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'account', id, ref: 'levelThrees' });
	},
	async levelFours({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'account', id, ref: 'levelFours' });
	},
	async transactions({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'account', id, ref: 'transactions' });
	},
	async credits({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'account',
			id,
			ref: 'credits',
			checkSuspension: false
		});
	},
	async debits({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'account',
			id,
			ref: 'debits',
			checkSuspension: false
		});
	}
};
