import { middleware } from '../controller';

export const checkAuth = (req, res, next) => {
	return middleware.checkAuth(false, { shouldBusiness: true, shouldAdmin: true }, { req, res, next });
};

export const checkGuest = (req, res, next) => {
	return middleware.checkGuest(null, null, { req, res, next });
};
