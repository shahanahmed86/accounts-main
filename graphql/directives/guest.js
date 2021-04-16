import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { checkGuest } from '../../controller/middleware';

class GuestDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { shouldAdmin, shouldAccount } = this.args;

		field.resolve = function (...args) {
			const [, , context] = args;

			checkGuest(false, { shouldAdmin, shouldAccount }, context);

			return resolve.apply(this, args);
		};
	}
}

export default GuestDirective;
