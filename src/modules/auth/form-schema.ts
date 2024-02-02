import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(1).email(),
	password: z.string().min(1),
});

export const registerSchema = loginSchema.extend({
	name: z.string().min(1),
});
