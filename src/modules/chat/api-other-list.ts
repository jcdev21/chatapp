import { API_URL } from '@/constans';
import { fetch } from '@/lib/fetch';

export async function getMembersOther(userId: string) {
	try {
		const response = await fetch(`${API_URL}/chat/${userId}/exclude`, {
			method: 'GET',
		});
		const result = await response.json();
		return result.data;
	} catch (error) {
		throw new Error('error');
	}
}
