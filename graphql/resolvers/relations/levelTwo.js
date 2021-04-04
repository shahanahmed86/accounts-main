import { filterRelationData, prisma } from '../../../utils';

export default {
	async levelOne({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'levelTwo', id, ref: 'levelOne', isRefSingle: true });
	},
	async account({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'levelTwo', id, ref: 'account', isRefSingle: true });
	},
	async levelThrees({ id }, _, { req }) {
		return filterRelationData({ req, tableRef: 'levelTwo', id, ref: 'levelThrees' });
	}
};
