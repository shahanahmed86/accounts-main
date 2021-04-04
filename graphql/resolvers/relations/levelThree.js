import { filterRelationData, prisma } from '../../../utils';

export default {
	async levelTwo({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'levelThree', id, ref: 'levelTwo', isRefSingle: true });
	},
	async account({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'levelThree', id, ref: 'account', isRefSingle: true });
	},
	async levelFours({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'levelThree', id, ref: 'levelFours' });
	}
};
