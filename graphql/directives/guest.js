import { ApolloError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class GuestDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = function (...args) {
			const [, , context] = args;

			if (context.req.headers['authorization']) {
				throw new ApolloError('You have an active login session...');
			}

			return resolve.apply(this, args);
		};
	}
}

export default GuestDirective;
