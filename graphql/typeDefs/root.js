import { gql } from 'apollo-server-express';

export default gql`
	scalar Date

	directive @auth(
		shouldAdmin: Boolean = false
		shouldAccount: Boolean = false
		doNotThrow: Boolean = false
	) on FIELD_DEFINITION
	directive @guest(shouldAdmin: Boolean = false, shouldAccount: Boolean = false) on FIELD_DEFINITION

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}

	enum Nature {
		ASSET
		EXPENSE
		LIABILITY
		EQUITY
		REVENUE
	}

	type Status {
		success: Boolean!
		message: String!
		debugMessage: String
	}
`;
