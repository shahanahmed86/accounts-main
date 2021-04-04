import { gql } from 'apollo-server-express';

export default gql`
	type LevelTwo {
		id: String!
		name: String!
		levelOne: LevelOne! @auth(shouldAccount: true, shouldAdmin: true)
		levelThrees: [LevelThree!] @auth(shouldAccount: true, shouldAdmin: true)
		account: Account! @auth(shouldAccount: true, shouldAdmin: true)
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		levelTwos: [LevelTwo!] @auth(shouldAccount: true, shouldAdmin: true)
		levelTwo(id: String!): LevelTwo! @auth(shouldAccount: true, shouldAdmin: true)
	}

	extend type Mutation {
		createLevelTwo(name: String!, levelOneId: String!): Status! @auth(shouldAccount: true)
		updateLevelTwo(id: String!, name: String, isSuspended: Boolean): Status!
			@auth(shouldAccount: true, shouldAdmin: true)
		deleteLevelTwo(id: String!): Status! @auth(shouldAccount: true)
	}
`;
