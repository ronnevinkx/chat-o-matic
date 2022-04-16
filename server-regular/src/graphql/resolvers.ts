import { PubSub } from 'graphql-subscriptions';

import Message from '../models/Message';

const pubsub = new PubSub();

interface MessageInput {
	messageInput: { text: string; username: string };
}

interface MessageArgTypes {
	id: string;
}

export default {
	Query: {
		messages: async () => await Message.find({}),
		message: async (_: unknown, { id }: MessageArgTypes) =>
			await Message.findById(id)
	},
	Mutation: {
		async createMessage(
			_: unknown,
			{ messageInput: { text, username } }: MessageInput
		) {
			const newMessage = new Message({
				text,
				createdBy: username
			});

			const res = await newMessage.save();

			pubsub.publish('MESSAGE_CREATED', {
				messageCreated: {
					text,
					createdBy: username
				}
			});

			return {
				id: res.id,
				...res._doc
			};
		}
	},
	Subscription: {
		messageCreated: {
			subscribe: () => pubsub.asyncIterator('MESSAGE_CREATED')
		}
	}
};
