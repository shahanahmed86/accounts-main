import { prisma } from '../../../utils';

export default {
	async levelOne(root) {
		return prisma.levelTwo.findUnique({ where: { id: root.id } }).levelOne();
	},
	async account(root) {
		return prisma.levelTwo.findUnique({ where: { id: root.id } }).account();
	},
	async levelThrees(root) {
		return prisma.levelTwo.findUnique({ where: { id: root.id } }).levelThrees();
	}
};
