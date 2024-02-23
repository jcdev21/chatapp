import { Button } from '@/components/ui/button';
import { fetch } from '@/lib/fetch';

export default function Chat() {
	async function getUsers() {
		try {
			const response = await fetch(`http://localhost:3000/user`, {
				method: 'GET',
			});
			const result = await response.json();
			console.log('DATA', result);
		} catch (error) {
			console.log('ERROR', error);
		}
	}

	return (
		<div>
			<h1 className="text-2xl font-bold">Chat</h1>
			<Button onClick={getUsers}>get users</Button>
		</div>
	);
}
