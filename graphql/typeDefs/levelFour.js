import { gql } from 'apollo-server-express';

export default gql`
	type LevelFour {
		id: String!
		name: String!
		levelThree: LevelThree! @auth(shouldAccount: true, shouldAdmin: true)
		debits: [Transaction!] @auth(shouldAccount: true, shouldAdmin: true)
		credits: [Transaction!] @auth(shouldAccount: true, shouldAdmin: true)
		account: Account! @auth(shouldAccount: true, shouldAdmin: true)
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		levelFours: [LevelFour!] @auth(shouldAccount: true, shouldAdmin: true)
		levelFour(id: String!): LevelFour! @auth(shouldAccount: true, shouldAdmin: true)
	}

	extend type Mutation {
		createLevelFour(name: String!, levelThreeId: String!): Status! @auth(shouldAccount: true)
		updateLevelFour(id: String!, name: String, levelThreeId: String!, isSuspended: Boolean): Status!
			@auth(shouldAccount: true, shouldAdmin: true)
		deleteLevelFour(id: String!): Status! @auth(shouldAccount: true)
	}
`;
