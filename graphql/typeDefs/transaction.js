import { gql } from 'apollo-server-express';

export default gql`
	type Transaction {
		id: String!
		debit: LevelFour!
		credit: LevelFour!
		amount: Float!
		description: String!
		account: Account!
		isSuspended: Boolean!
		logs: String!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		transactions: [Transaction!] @auth(shouldAccount: true, shouldAdmin: true)
		transaction(id: String!): Transaction! @auth(shouldAccount: true, shouldAdmin: true)
	}

	extend type Mutation {
		createTransaction(
			debitId: String!
			creditId: String!
			amount: Float!
			description: String!
		): Status! @auth(shouldAccount: true)
		updateTransaction(
			id: String!
			debitId: String
			creditId: String
			amount: Float
			description: String
			isSuspended: Boolean
		): Status! @auth(shouldAccount: true)
		deleteTransaction(id: String!): Status! @auth(shouldAccount: true)
	}
`;
