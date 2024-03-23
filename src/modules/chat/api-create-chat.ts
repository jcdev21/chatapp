import { API_URL } from '@/constans';
import { fetch } from '@/lib/fetch';
import HttpError from '@/lib/handle-error';
import { TCreateChat } from './types';

export const createChat = async (payload: TCreateChat) => {
	try {
		const response = await fetch(`${API_URL}/chat`, {
			method: 'POST',
			body: JSON.stringify(payload),
		});
		return await response.json();
	} catch (error) {
		if (error instanceof HttpError) return error;
		console.log('other errors');
		console.log(error);
	}
};
