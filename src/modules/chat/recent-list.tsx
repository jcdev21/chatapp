import { Chat } from './types';
import { User } from '../user/types';
import UserChatCard from '@/components/user-chat-card';
import { useNavigate } from 'react-router-dom';

type RecentListProps = {
	chats: (Chat & { detailMember: User })[];
};

export default function RecentList({ chats }: RecentListProps) {
	const navigate = useNavigate();

	function openChatroom(chat: Chat) {
		navigate(`${chat.id}`);
	}

	return (
		<div className="flex flex-col gap-4 first:mt-4">
			{chats.map((chat) => {
				const { detailMember, ...restChat } = chat;
				return (
					<UserChatCard
						key={restChat.id}
						user={detailMember}
						time={new Date(restChat.updatedAt)}
						onChatroom={() => openChatroom(restChat)}
					/>
				);
			})}
		</div>
	);
}
