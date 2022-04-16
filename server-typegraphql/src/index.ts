import 'dotenv-safe/config';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { buildSchema } from 'type-graphql';
import { WebSocketServer } from 'ws';

import { resolvers } from './resolvers';
import { timestamp } from './utils/timestamp';

const main = async () => {
	// main variables
	const PORT = parseInt(process.env.PORT) || 4000;
	const NODE_ENV = process.env.NODE_ENV || 'development';
	const DB_URI = process.env.DB_URI;

	// express setup
	const app = express();
	const httpServer = createServer(app);

	// apollo setup
	const schema = await buildSchema({
		resolvers,
		validate: false
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
			`${timestamp()}: 🚀 Server is now running in ${NODE_ENV} mode on http://localhost:${PORT}${
				server.graphqlPath
			}`
		);
	});
};

main().catch(error => console.error(error));
