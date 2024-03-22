import { API_URL } from '@/constans';
import { fetch } from '@/lib/fetch';
import HttpError from '@/lib/handle-error';

export async function getMessages(chatId: string) {
	try {
		const response = await fetch(`${API_URL}/message/${chatId}`, {
			method: 'GET',
		});
		return await response.json();
	} catch (error) {
		if (error instanceof HttpError) return error;
	}
}
