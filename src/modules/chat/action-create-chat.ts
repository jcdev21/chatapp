import { redirect } from 'react-router-dom';
import { createChat } from './api-create-chat';
import { Chat, TCreateChat } from './types';

export async function actionCreateChat({ request }: { request: Request }) {
	const payload = (await request.json()) as TCreateChat;
	const result = await createChat(payload);
	if (result.status) {
		const data = result.data as Chat;
		return redirect(`/${data.id}`);
	}
	return result;
}
