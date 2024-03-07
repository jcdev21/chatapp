import { API_URL } from '@/constans';
import { fetch } from '@/lib/fetch';
import HttpError from '@/lib/handle-error';

export async function getMembersChat(userId: string) {
	try {
		const response = await fetch(`${API_URL}/chat/${userId}`, {
			method: 'GET',
		});
		return await response.json();
	} catch (error) {
		if (error instanceof HttpError) return error;
	}
}
