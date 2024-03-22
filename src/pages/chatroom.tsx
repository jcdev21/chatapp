import Message from '@/modules/chatroom/message';
import { useAuth } from '@/modules/auth/auth-context';
import type { Message as MessageType } from '@/modules/chatroom/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import FormChat from '@/modules/chatroom/form-chat';
import { socket } from '@/utils/socket';

export default function Chatroom() {
	const historyMessage = useLoaderData() as MessageType[];
	const [messages, setMessages] = useState<MessageType[]>(historyMessage);
	const listRef = useRef<HTMLDivElement>(null);

	const { chatId } = useParams();
	const { user } = useAuth();

	function sendMessageHandle(message: string) {
		socket.emit('sendMessage', {
			chatId,
			message,
			senderId: user?.id,
		});
	}

	const sendMessageSocketHandle = useCallback((message: MessageType) => {
		setMessages((prev) => [...prev, message]);
	}, []);

	useEffect(() => {
		socket.emit('joinChat', chatId);
		return () => {
			socket.off('joinChat');
		};
	}, [chatId]);

	useEffect(() => {
		socket.on('receiveMessage', sendMessageSocketHandle);
		return () => {
			socket.off('receiveMessage', sendMessageSocketHandle);
		};
	}, [sendMessageSocketHandle]);

	useEffect(() => {
		if (!socket.connected) {
			socket.connect();
		}
	}, []);

	useEffect(() => {
		listRef.current?.lastElementChild?.scrollIntoView();
	}, [messages]);

	return (
		<div className="w-96 h-[calc(100vh-6rem)] bg-white rounded-t-lg overflow-hidden flex flex-col justify-end">
			<div
				className="h-fit px-2 py-4 overflow-auto flex flex-col"
				ref={listRef}
			>
				{messages.length
					? messages.map((message) => (
							<Message
								key={message.id}
								message={message.message}
								isRight={message.senderId === user?.id}
							/>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ))
					: null}
			</div>
			<div className="p-2 bg-slate-300">
				<FormChat onSendMessage={sendMessageHandle} />
			</div>
		</div>
	);
}
