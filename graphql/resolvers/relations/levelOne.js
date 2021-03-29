import { prisma } from '../../../utils';

export default {
	async levelTwos(root) {
		return prisma.levelOne.findUnique({ where: { id: root.id } }).levelTwos();
	},
	async account(root) {
		return prisma.levelOne.findUnique({ where: { id: root.id } }).account();
	}
};
