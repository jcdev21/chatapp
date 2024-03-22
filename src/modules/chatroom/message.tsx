import { cn } from '@/lib/utils';

type MessageProps = {
	message: string;
	isRight: boolean;
};

export default function Message({ message, isRight }: MessageProps) {
	return (
		<div
			className={cn(
				'w-fit max-w-80 self-start bg-secondary mb-2 px-3 py-2 rounded-lg text-sm',
				isRight && 'self-end bg-green-200'
			)}
		>
			{message}
		</div>
	);
}
