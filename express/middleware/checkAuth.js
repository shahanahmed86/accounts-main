import { middleware } from '../../controller';

export default (req, res, next) => {
	return middleware.checkAuth(false, { shouldBusiness: true, shouldAdmin: true }, { req, res, next });
};
