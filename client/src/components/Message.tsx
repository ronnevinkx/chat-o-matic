import { Typography } from '@mui/material';
import { Message as MessageType } from '../__generated__/graphql';

interface MessageProps {
	message: MessageType;
	username: string;
}

export const Message: React.FC<MessageProps> = ({ message, username }) => {
	const { text, createdBy } = message;

	return (
		<div
			style={{
				display: 'flex',
				justifyContent:
					username === createdBy ? 'flex-end' : 'flex-start',
				paddingBottom: '1em',
				margin: '0 8px'
			}}
		>
			{username !== createdBy && (
				<Typography
					sx={{
						fontSize: '18pt',
						marginRight: '0.5em',
						textAlign: 'center',
						py: 1,
						px: 1.5,
						border: '2px solid #e5e6ea',
						borderRadius: 25
					}}
				>
					{createdBy.slice(0, 2).toUpperCase()}
				</Typography>
			)}
			<Typography
				sx={{
					background: username === createdBy ? '#58bf56' : '#e5e6ea',
					color: username === createdBy ? 'white' : 'black',
					padding: '6px 14px',
					borderRadius: '1em',
					maxWidth: '60%',
					alignSelf: 'center'
				}}
			>
				{text}
			</Typography>
		</div>
	);
};
