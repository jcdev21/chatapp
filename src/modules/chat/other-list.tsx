import React from 'react';
import { User } from '../user/types';
import UserChatCard from '@/components/user-chat-card';

type OtherListProps = {
	users: User[];
};

export default function OtherList({ users }: OtherListProps) {
	function openChatroom() {
		console.log('yo');
	}

	return (
		<div className="flex flex-col gap-4 first:mt-4">
			{users.map((user) => (
				<UserChatCard
					key={user.id}
					user={user}
					onChatroom={openChatroom}
				/>
			))}
		</div>
	);
}
