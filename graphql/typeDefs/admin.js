import { gql } from 'apollo-server-express';

export default gql`
	type Admin {
		id: String!
		username: String!
		password: String
		createdAt: Date
		updatedAt: Date
	}

	extend type Query {
		loggedInAdmin: Admin! @auth(shouldAdmin: true)
	}

	extend type Mutation {
		loginAdmin(username: String!, password: String!): Admin! @guest(shouldAdmin: true)
		adminSignOut: Boolean! @auth(shouldAdmin: true)
	}
`;
