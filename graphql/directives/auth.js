import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { checkExistence, getDecodedToken } from '../../utils';

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { shouldAdmin, shouldAccount, doNotThrow } = this.args;

		field.resolve = async function (...args) {
			const [, , context] = args;

			const decoded = getDecodedToken(context.req, doNotThrow);
			if (decoded) {
				if (shouldAdmin && 'adminId' in decoded) {
					const admin = await checkExistence('admin', decoded.adminId, 'Admin');
					context.req.user = {
						...admin,
						userType: 'admin'
					};
				} else if (shouldAccount && 'accountId' in decoded) {
					const account = await checkExistence('account', decoded.accountId, 'Account', true);
					context.req.user = {
						...account,
						userType: 'account'
					};
				} else {
					throw new AuthenticationError("You aren't authorize for such actions...");
				}
			}

			return resolve.apply(this, args);
		};
	}
}

export default AuthDirective;
