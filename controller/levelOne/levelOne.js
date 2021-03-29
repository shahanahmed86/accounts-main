import { checkExistence, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	return checkExistence('levelOne', id, 'Record');
};
