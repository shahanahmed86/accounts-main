import 'dotenv/config';

import http from 'http';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/typeDefs';
import * as resolvers from './graphql/resolvers';
import * as schemaDirectives from './graphql/directives';

import { APP_PORT, IN_PROD } from './config';

import app from './express';

(async () => {
	try {
		const server = new ApolloServer({
			introspection: true,
			playground: IN_PROD
				? false
				: {
						'request.credentials': 'include',
						shareEnabled: true
				  },
			typeDefs,
			resolvers,
			schemaDirectives,
			context: ({ req, res }) => ({ req, res })
		});
		await server.start();

		server.applyMiddleware({ app, path: '/graphql', cors: false });

		const httpServer = http.createServer(app);
		server.installSubscriptionHandlers(httpServer);

		const port = APP_PORT || 4000;

		httpServer.listen({ port }, () => {
			console.log(`🚀 Apollo Server on http://localhost:${port}${server.graphqlPath}`);
			console.log(`🚀 Subscriptions at ws://localhost:${port}${server.subscriptionsPath}`);
		});

		return { server, app };
	} catch (error) {
		console.error('server crash...');

		console.log(error);
	}
})();
