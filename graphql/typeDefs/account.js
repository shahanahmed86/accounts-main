import { gql } from 'apollo-server-express';

export default gql`
	type Account {
		id: String!
		username: String!
		password: String
		email: String!
		cell: String!
		name: String!
		avatar: String!
		levelOnes: [LevelOne!] @auth(shouldAccount: true, shouldAdmin: true)
		levelTwos: [LevelTwo!] @auth(shouldAccount: true, shouldAdmin: true)
		levelThrees: [LevelThree!] @auth(shouldAccount: true, shouldAdmin: true)
		levelFours: [LevelFour!] @auth(shouldAccount: true, shouldAdmin: true)
		transactions: [Transaction!] @auth(shouldAccount: true, shouldAdmin: true)
		debits: [Debit!] @auth(shouldAccount: true, shouldAdmin: true)
		credits: [Credit!] @auth(shouldAccount: true, shouldAdmin: true)
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		accounts: [Account!] @auth(shouldAdmin: true)
		account(id: String!): Account! @auth(shouldAdmin: true)
		loggedInAccount: Account! @auth(shouldAccount: true)
	}

	extend type Mutation {
		createAccount(
			username: String!
			password: String!
			email: String!
			cell: String!
			name: String!
			avatar: Upload!
		): Status! @auth(shouldAdmin: true)
		updateAccount(
			id: String!
			username: String
			password: String
			email: String
			cell: String
			name: String
			avatar: Upload
			isSuspended: Boolean
		): Status! @auth(shouldAdmin: true)
		deleteAccount(id: String!): Status! @auth(shouldAdmin: true)
		loginAccount(username: String!, password: String!): Account! @guest(shouldAccount: true)
		accountSignOut: Boolean! @auth(shouldAccount: true)
	}
`;
