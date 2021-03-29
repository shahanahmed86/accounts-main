import { gql } from 'apollo-server-express';

export default gql`
	type LevelThree {
		id: String!
		name: String!
		levelTwo: LevelTwo!
		levelFours: [LevelFour!]
		account: Account!
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		levelThrees: [LevelThree!] @auth(shouldAccount: true, shouldAdmin: true)
		levelThree(id: String!): LevelThree! @auth(shouldAccount: true, shouldAdmin: true)
	}

	extend type Mutation {
		createLevelThree(name: String!, levelTwoId: String!): Status! @auth(shouldAccount: true)
		updateLevelThree(id: String!, name: String, levelTwoId: String!, isSuspended: Boolean): Status!
			@auth(shouldAccount: true)
		deleteLevelThree(id: String!): Status! @auth(shouldAccount: true)
	}
`;
