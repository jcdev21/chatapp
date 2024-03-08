import { useParams } from 'react-router-dom';

export default function Chatroom() {
	const { chatId } = useParams();
	console.log('chatId', chatId);

	return (
		<div className="w-96 h-[calc(100vh-6rem)] bg-white rounded-t-lg overflow-hidden"></div>
	);
}
