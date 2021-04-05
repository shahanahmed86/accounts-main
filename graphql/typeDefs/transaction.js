import { gql } from 'apollo-server-express';

export default gql`
	type Debit {
		id: String!
		head: LevelFour! @auth(shouldAccount: true, shouldAdmin: true)
		amount: Float!
		description: String!
		transaction: Transaction! @auth(shouldAccount: true, shouldAdmin: true)
		account: Account! @auth(shouldAccount: true, shouldAdmin: true)
		createdAt: Date!
		updatedAt: Date!
	}

	type Credit {
		id: String!
		head: LevelFour! @auth(shouldAccount: true, shouldAdmin: true)
		amount: Float!
		description: String!
		transaction: Transaction! @auth(shouldAccount: true, shouldAdmin: true)
		account: Account! @auth(shouldAccount: true, shouldAdmin: true)
		createdAt: Date!
		updatedAt: Date!
	}

	type Transaction {
		id: String!
		debits: [Debit!] @auth(shouldAccount: true, shouldAdmin: true)
		credits: [Credit!] @auth(shouldAccount: true, shouldAdmin: true)
		account: Account! @auth(shouldAccount: true, shouldAdmin: true)
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
		createTransaction(debitInputs: [EntryInput!]!, creditInputs: [EntryInput!]!): Status!
			@auth(shouldAccount: true)
		updateTransaction(
			id: String!
			debitInputs: [EntryInput!]
			creditInputs: [EntryInput!]
			isSuspended: Boolean
		): Status! @auth(shouldAccount: true, shouldAdmin: true)
		deleteTransaction(id: String!): Status! @auth(shouldAccount: true)
	}

	input EntryInput {
		id: String
		headId: String!
		amount: Float!
		description: String!
	}
`;
