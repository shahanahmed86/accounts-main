import { filterRelationData, prisma } from '../../../utils';

export default {
	async levelThree({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'levelFour',
			id,
			ref: 'levelThree',
			isRefSingle: true
		});
	},
	async account({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'levelFour',
			id,
			ref: 'account',
			isRefSingle: true
		});
	},
	async debits({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'levelFour',
			id,
			ref: 'debits',
			checkSuspension: false
		});
	},
	async credits({ id }, _, { req }) {
		return filterRelationData({
			req,
			tableRef: 'levelFour',
			id,
			ref: 'credits',
			checkSuspension: false
		});
	}
};
