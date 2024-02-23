export {};
declare global {
	interface Window {
		requestInterceptor: (args: RequestInit) => RequestInit;
		responseInterceptor: (response: Response) => Response;
	}
}
