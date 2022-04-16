import { gql } from 'apollo-server';

export default gql`
	type Message {
		id: ID
		text: String
		createdBy: String
	}

	input MessageInput {
		text: String
		username: String
	}

	type Query {
		messages: [Message]
		message(id: ID!): Message
	}

	type Mutation {
		createMessage(messageInput: MessageInput!): Message!
	}

	type Subscription {
		messageCreated: Message!
	}
`;
