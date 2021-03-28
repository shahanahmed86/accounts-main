import { existsSync } from 'fs';
import { Router } from 'express';

const router = Router();

//downloading files
router.get(`/files/:filename`, (req, res) => {
	const file = `./uploads/${req.params.filename}`;
	if (existsSync(file)) return res.download(file);
	res.status(404).send('file not found...');
});

export default router;
