import 'dotenv-safe/config';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const main = async () => {
	// main variables
	const PORT = parseInt(process.env.PORT) || 4000;
	const NODE_ENV = process.env.NODE_ENV || 'development';
	const DB_URI = process.env.DB_URI;

	const app = express();
	const httpServer = createServer(app);

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	});

	const subscriptionServer = new WebSocketServer({
		server: httpServer,
		path: '/graphql'
	});

	useServer({ schema }, subscriptionServer);

	const server = new ApolloServer({
		schema,
		plugins: [
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						}
					};
				}
			}
		]
	});

	await server.start();
	server.applyMiddleware({ app });

	// connect to database
	mongoose.connect(DB_URI);

	httpServer.listen(PORT, () => {
		console.log(
			`🚀 Server is now running in ${NODE_ENV} mode on http://localhost:${PORT}${server.graphqlPath}`
		);
	});
};

main().catch(error => console.error(error));
