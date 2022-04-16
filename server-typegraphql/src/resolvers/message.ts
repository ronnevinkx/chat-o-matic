import mongoose from 'mongoose';
import {
	Arg,
	Field,
	InputType,
	Mutation,
	PubSub,
	PubSubEngine,
	Query,
	Root,
	Subscription
} from 'type-graphql';

import { Message, MessageModel } from '../entities/Message';
// import { Notification, NotificationPayload } from '../entities/Notification';

const MESSAGE_CREATED_TOPIC = 'MESSAGE_CREATED';

@InputType()
export class MessageInput {
	@Field()
	text: string;

	@Field()
	username: string;
}

// @ObjectType()
// class MessagesResponse {
// 	@Field()
// 	count: number;

// 	@Field(() => [Message])
// 	messages: Message[];
// }

export class MessageResolver {
	// read all
	@Query(() => [Message])
	async messages(): Promise<Message[]> {
		const messages = await MessageModel.find();

		return messages;
	}

	// @Query(() => MessagesResponse)
	// async messages(): Promise<MessagesResponse> {
	// 	const messages = await MessageModel.find();

	// 	return {
	// 		count: messages.length,
	// 		messages
	// 	};
	// }

	// read single
	@Query(() => Message, { nullable: true })
	async message(
		@Arg('id', () => String) id: string
	): Promise<Message | null> {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}

		return await MessageModel.findOne({ _id: id });
	}

	// create
	@Mutation(() => Message)
	async createMessage(
		@Arg('messageInput') messageInput: MessageInput,
		@PubSub() pubSub: PubSubEngine
	): Promise<Message> {
		const { text, username } = messageInput;

		const newMessage = {
			text,
			createdBy: username
		};

		const messageDoc = await MessageModel.create(newMessage);
		const { id, createdAt, updatedAt } = messageDoc;

		const payload = {
			...newMessage,
			_id: id,
			createdAt,
			updatedAt
		};

		await pubSub.publish(MESSAGE_CREATED_TOPIC, payload);

		return messageDoc;
	}

	// update
	@Mutation(() => Message, { nullable: true })
	async updateMessage(
		@Arg('id') id: string,
		@Arg('messageInput') messageInput: MessageInput
	): Promise<Message | null> {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}

		const { text, username } = messageInput;

		const newMessage = {
			text,
			createdBy: username
		};

		return await MessageModel.findByIdAndUpdate(id, newMessage, {
			new: true,
			runValidators: true
		});
	}

	// delete single
	@Mutation(() => Boolean)
	async deleteMessage(@Arg('id') id: string): Promise<boolean> {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return false;
		}

		const message = await MessageModel.findOne({ _id: id });

		if (!message) {
			return false;
		}

		await MessageModel.findByIdAndDelete(id);
		return true;
	}

	// delete all
	@Mutation(() => Boolean)
	async deleteMessages(): Promise<boolean> {
		await MessageModel.deleteMany();
		return true;
	}

	// "message created" subscription
	@Subscription({
		topics: MESSAGE_CREATED_TOPIC
	})
	messageCreated(@Root() message: Message): Message {
		return message;
	}

	// @Subscription({ topics: channel })
	// messageSent(@Root() { id, name, message }: Chat): Chat {
	// 	return { id, name, message };
	// }
	// messageCreated(
	// 	@Root() notificationPayload: NotificationPayload
	// ): Notification {
	// 	return {
	// 		...notificationPayload,
	// 		date: new Date()
	// 	};
	// }
}
