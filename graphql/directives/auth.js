import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { middleware } from '../../controller';

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { shouldAdmin, shouldAccount, doNotThrow } = this.args;

		field.resolve = async function (...args) {
			const [, , context] = args;

			await middleware.checkAuth(false, { shouldAccount, shouldAdmin, doNotThrow }, context);

			return resolve.apply(this, args);
		};
	}
}

export default AuthDirective;
