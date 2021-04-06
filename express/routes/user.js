import { Router } from 'express';
import { prisma } from '../../utils';
import { checkAuth } from '../middleware';

const router = Router();

router.get(`/loggedIn`, checkAuth, async (req, res) => {
	if (req.user.userType === 'admin') {
		req.user.password = null;
		return res.status(200).json(req.user);
	}
	const account = await prisma.account.findUnique({
		where: { id: req.user.id },
		include: {
			levelOnes: true,
			levelTwos: true,
			levelThrees: true,
			levelFours: true,
			transactions: true
		}
	});
	account.password = null;
	return res.status(200).json(account);
});

export default router;
