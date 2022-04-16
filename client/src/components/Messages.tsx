import { useEffect } from 'react';
import {
	Message as MessageType,
	MessageCreatedDocument,
	useMessagesQuery
} from '../__generated__/graphql';
import { Message } from './Message';

interface MessagesProps {
	username: string;
}

export const Messages: React.FC<MessagesProps> = ({ username }) => {
	const { loading, error, data, subscribeToMore } = useMessagesQuery();

	useEffect(() => {
		subscribeToMore({
			document: MessageCreatedDocument,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				//@ts-ignore Property 'messageCreated' does not exist on type 'MessagesQuery'.ts(2339)
				const newMessage = subscriptionData.data.messageCreated;
				return {
					messages: [...prev.messages, newMessage]
				};
			}
		});
	}, [subscribeToMore]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{`Error: ${error.message}`}</p>;

	return (
		<div>
			{data?.messages.map((message: MessageType) => (
				<Message
					key={message._id}
					message={message}
					username={username}
				/>
			))}
		</div>
	);
};
