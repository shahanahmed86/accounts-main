import { prisma } from '../../utils';

export default (parent, args, context, info) => {
	return prisma.levelOne.findMany();
};
