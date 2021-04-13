import { middleware } from '../controller';

export const checkAuth = async (req, res, next) => {
	try {
		await middleware.checkAuth(false, { shouldBusiness: true, shouldAdmin: true }, { req, res });
		next();
	} catch (error) {
		console.error(error);
		return res.status(400).send(error.message);
	}
};

export const checkGuest = (req, res, next) => {
	try {
		middleware.checkGuest(null, null, { req, res });
		next();
	} catch (error) {
		console.error(error);
		return res.status(400).send(error.message);
	}
};
