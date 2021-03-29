import { prisma } from '../../../utils';

export default {
	async password() {
		return null;
	},
	async levelOnes(root) {
		return prisma.account.findUnique({ where: { id: root.id } }).levelOnes();
	},
	async levelTwos(root) {
		return prisma.account.findUnique({ where: { id: root.id } }).levelTwos();
	},
	async levelThrees(root) {
		return prisma.account.findUnique({ where: { id: root.id } }).levelThrees();
	},
	async levelFours(root) {
		return prisma.account.findUnique({ where: { id: root.id } }).levelFours();
	},
	async transactions(root) {
		return prisma.account.findUnique({ where: { id: root.id } }).transactions();
	}
};
