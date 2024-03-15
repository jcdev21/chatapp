import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/modules/user/types';

type UserCardProps = {
	user: User;
	time?: Date;
	onChatroom: () => void;
};

export default function UserChatCard({
	user,
	time,
	onChatroom,
}: UserCardProps) {
	return (
		<div
			role="button"
			tabIndex={0}
			className="p-1 rounded-lg flex justify-between items-center cursor-pointer transition duration-200 hover:bg-primary"
			onClick={onChatroom}
		>
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarImage src="avatar.png" />
					<AvatarFallback>UU</AvatarFallback>
				</Avatar>
				<div>
					<span className="font-medium">{user.name}</span>
				</div>
			</div>
			{time ? (
				<div>
					<span className="text-sm font-thin">
						{time?.toLocaleDateString('id-ID')}
					</span>
				</div>
			) : null}
		</div>
	);
}
