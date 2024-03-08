import { getAccessTokenCookie, getUserCookie } from '@/lib/utils';
import { getMembersChat } from './api-recent-list';
import { getMembersOther } from './api-other-list';
import { defer, redirect } from 'react-router-dom';
import { User } from '../user/types';
import { Chat } from './types';
import { HttpSuccess } from '@/lib/handle-http-success';

export type TFetchReturnType = {
	recents: HttpSuccess<(Chat & { detailMember: User })[]>;
	others: Promise<HttpSuccess<User[]>>;
};

export async function loader() {
	const user = getUserCookie();
	const accessToken = getAccessTokenCookie();

	if (!user && !accessToken) return redirect('/login');

	const recents = await getMembersChat(user?.id as string);
	const others = getMembersOther(user?.id as string);
	return defer({ recents, others });
}
