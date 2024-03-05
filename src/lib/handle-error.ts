type ZodErrors = Array<{
	code: string;
	message: string;
	path: string[];
}>;

export default class HttpError extends Error {
	status: boolean;
	statusCode: number;
	errors: ZodErrors | undefined;

	constructor(
		message: string,
		status: boolean,
		statusCode: number,
		errors?: ZodErrors
	) {
		super(message);
		this.name = 'HttpError';
		this.status = status;
		this.statusCode = statusCode;
		if (errors) {
			this.errors = errors;
		}
	}
}
