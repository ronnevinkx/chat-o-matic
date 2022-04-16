import { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { Messages } from './Messages';
import { useCreateMessageMutation } from '../__generated__/graphql';

interface ChatProps {}

export const Chat: React.FC<ChatProps> = () => {
	const [state, setState] = useState({
		text: '',
		username: ''
	});

	const [createMessage] = useCreateMessageMutation();

	const onSend = () => {
		if (state.text.length > 0) {
			createMessage({
				variables: {
					messageInput: state
				}
			});
		}

		setState({
			...state,
			text: ''
		});
	};

	return (
		<Container>
			<Messages username={state.username} />
			<Box sx={{ display: 'flex', my: 2 }}>
				<Box sx={{ p: 1 }}>
					<TextField
						label="User"
						required
						variant="outlined"
						value={state.username}
						onChange={e =>
							setState({
								...state,
								username: e.target.value
							})
						}
					/>
				</Box>
				<Box sx={{ p: 1, flexGrow: 1 }}>
					<TextField
						label="Text"
						required
						variant="outlined"
						fullWidth
						value={state.text}
						onChange={e =>
							setState({
								...state,
								text: e.target.value
							})
						}
						onKeyUp={e => {
							if (e.key === 'Enter') {
								onSend();
							}
						}}
					/>
				</Box>
				<Box sx={{ p: 1 }}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ p: 2, minWidth: 130 }}
						onClick={() => onSend()}
					>
						Send
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
