import { gql } from 'apollo-server-express';

export default gql`
	scalar Date

	directive @auth(
		shouldAdmin: Boolean = false
		shouldAccount: Boolean = false
		doNotThrow: Boolean = false
	) on FIELD_DEFINITION
	directive @guest on FIELD_DEFINITION

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;
