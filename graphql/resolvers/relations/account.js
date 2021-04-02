import { prisma } from '../../../utils';

export default {
	async password() {
		return null;
	},
	async levelOnes(root, _, context) {
		console.log(context.req.user.userType);
		const where = {};
		if (context.req.user.userType !== 'admin') where.isSuspended = false;
		return prisma.account.findUnique({ where: { id: root.id } }).levelOnes({ where });
	},
	async levelTwos(root, _, context) {
		const where = {};
		if (context.req.user.userType !== 'admin') where.isSuspended = false;
		return prisma.account.findUnique({ where: { id: root.id } }).levelTwos({ where });
	},
	async levelThrees(root, _, context) {
		const where = {};
		if (context.req.user.userType !== 'admin') where.isSuspended = false;
		return prisma.account.findUnique({ where: { id: root.id } }).levelThrees({ where });
	},
	async levelFours(root, _, context) {
		const where = {};
		if (context.req.user.userType !== 'admin') where.isSuspended = false;
		return prisma.account.findUnique({ where: { id: root.id } }).levelFours({ where });
	},
	async transactions(root, _, context) {
		const where = {};
		if (context.req.user.userType !== 'admin') where.isSuspended = false;
		return prisma.account.findUnique({ where: { id: root.id } }).transactions({ where });
	}
};
