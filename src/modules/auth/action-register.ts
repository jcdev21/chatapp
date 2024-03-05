import { redirect } from 'react-router-dom';
import { RegisterCredentialsDTO } from './types';
import { registerUser } from './api-register';

export async function actionRegister({ request }: { request: Request }) {
	const payload = (await request.json()) as RegisterCredentialsDTO;
	const result = await registerUser(payload);
	if (result.success) return redirect('/login');
	return result;
}
