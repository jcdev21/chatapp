export type Chat = {
	id: string;
	members: string[];
	createdAt: Date;
	updatedAt: Date;
};

export type TCreateChat = {
	members: Pick<Chat, 'members'>;
};
