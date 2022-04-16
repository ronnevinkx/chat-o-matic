import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	split,
	HttpLink
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Chat } from './components/Chat';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql'
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: 'ws://localhost:4000/graphql'
	})
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Chat />
		</ApolloProvider>
	);
}

export default App;
