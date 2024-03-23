import { useActionData, useSubmit } from 'react-router-dom';
import { User } from '../user/types';
import UserChatCard from '@/components/user-chat-card';
import HttpError from '@/lib/handle-error';
import { useAuth } from '../auth/auth-context';

type OtherListProps = {
	users: User[];
};

export default function OtherList({ users }: OtherListProps) {
	const { user } = useAuth();
	const submit = useSubmit();
	const errors = useActionData() as HttpError;
	console.log('errors', errors);

	function openChatroom(recepient: User) {
		console.log('yo');
		const payload = { members: [user?.id, recepient.id] };
		submit(JSON.stringify(payload), {
			method: 'post',
			action: '',
			encType: 'application/json',
		});
	}

	return (
		<div className="flex flex-col gap-4 first:mt-4">
			{users.map((user) => (
				<UserChatCard
					key={user.id}
					user={user}
					onChatroom={() => openChatroom(user)}
				/>
			))}
		</div>
	);
}
