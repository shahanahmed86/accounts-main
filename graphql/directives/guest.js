import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { checkGuest } from '../../controller/middleware';

class GuestDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = function (...args) {
			const [, , context] = args;

			checkGuest(false, false, context);

			return resolve.apply(this, args);
		};
	}
}

export default GuestDirective;
