import { Router } from 'express';
import { checkAuth } from '../middleware';

const router = Router();

router.get(`/loggedIn`, checkAuth, async (req, res) => {
	return res.status(200).json(req.user);
});

export default router;
