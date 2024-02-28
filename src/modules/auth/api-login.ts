import { API_URL } from '@/constans';
import { fetch } from '@/lib/fetch';

type LoginCredentialsDTO = {
	email: string;
	password: string;
};

export const loginWithEmailAndPassword = async (
	payload: LoginCredentialsDTO
) => {
	return await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		body: JSON.stringify(payload),
	});
};
