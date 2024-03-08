export type HttpSuccess<T> = {
	data: T;
	message: string;
	status: boolean;
	statusCode: number;
};
