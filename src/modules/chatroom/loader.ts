import { HttpSuccess } from '@/lib/handle-http-success';
import { LoaderFunctionArgs } from 'react-router-dom';
import { Message } from './types';
import { getMessages } from './api-messages';

type TFetchReturnType = HttpSuccess<Message[]>;

export async function loader({ params }: LoaderFunctionArgs) {
	const result: TFetchReturnType = await getMessages(params.chatId as string);
	return result.data;
}
