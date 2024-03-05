import { API_URL } from '@/constans';
import {
	deleteAuthCookies,
	getAccessTokenCookie,
	setAccessTokenCookie,
	setUserCookie,
} from './utils';
import HttpError from './handle-error';

const originalFetch = window.fetch;

window.requestInterceptor = (args: RequestInit) => {
	args.headers = new Headers();
	const token = getAccessTokenCookie();

	if (token) {
		args.headers.set('authorization', `Bearer ${token}`);
	}

	args.headers.set('Access-Control-Allow-Origin', API_URL);
	args.headers.set('Accept', 'application/json');
	args.headers.set('Content-Type', 'application/json');
	args.credentials = 'include';

	return args;
};

window.responseInterceptor = (response: Response) => {
	return response;
};

window.fetch = async (...args) => {
	args[1] = window.requestInterceptor(args[1] as RequestInit);
	let response = await originalFetch(...args);
	response = window.responseInterceptor(response);

	if (!response.ok && response.status === 401) {
		const originalRequest = args;
		const refreshHeaders = new Headers(originalRequest[1]?.headers);
		const fetchRefreshResponse = await window.fetch(
			`${API_URL}/auth/refresh`,
			{
				method: 'POST',
				headers: refreshHeaders,
				credentials: 'include',
			}
		);

		if (fetchRefreshResponse.ok) {
			const resultRefresh = await fetchRefreshResponse.json();
			const { accessToken, ...user } = resultRefresh.data;
			setAccessTokenCookie(accessToken);
			setUserCookie(user);

			const newOriginalRequestHeaders = new Headers(
				originalRequest[1]?.headers
			);
			newOriginalRequestHeaders.set(
				'authorization',
				`Bearer ${accessToken}`
			);
			return await window.fetch(originalRequest[0], {
				...originalRequest[1],
				headers: newOriginalRequestHeaders,
			});
		}
	}

	if (response.ok) {
		return response;
		// return await response.json();
	}

	if (!response.ok && response.status === 403) {
		deleteAuthCookies();
		window.location.replace('/login');
	}

	// return Promise.reject(response);
	const dataError = (await response.json()) as HttpError;
	return Promise.reject(
		new HttpError(
			dataError.message,
			dataError.status,
			dataError.statusCode,
			dataError.errors
		)
	);
};

export const fetch = window.fetch;
