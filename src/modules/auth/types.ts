type CredentialsDTO = {
	email: string;
	password: string;
};

export type LoginCredentialsDTO = CredentialsDTO;

export type RegisterCredentialsDTO = CredentialsDTO & {
	name: string;
};
