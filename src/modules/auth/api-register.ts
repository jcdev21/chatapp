import { API_URL } from '@/constans';
import { fetch } from '@/lib/fetch';
import { RegisterCredentialsDTO } from './types';
import HttpError from '@/lib/handle-error';

export const registerUser = async (payload: RegisterCredentialsDTO) => {
	try {
		const response = await fetch(`${API_URL}/auth/register`, {
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
