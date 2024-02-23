import { fetch } from '@/lib/fetch';

type LoginCredentialsDTO = {
	email: string;
	password: string;
};

export const loginWithEmailAndPassword = async (
	payload: LoginCredentialsDTO
) => {
	// const formData = new FormData();
	// formData.append('email', payload.email);
	// formData.append('password', payload.password);
	return await fetch('http://localhost:3000/auth/login', {
		method: 'POST',
		body: JSON.stringify(payload),
	});
};
