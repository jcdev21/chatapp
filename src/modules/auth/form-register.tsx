import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerSchema } from './form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useActionData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';
import HttpError from '@/lib/handle-error';

export default function FormRegister() {
	const submit = useSubmit();
	const errors = useActionData() as HttpError;

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	});

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		console.log(values);
		submit(values, {
			method: 'post',
			action: '/register',
			encType: 'application/json',
		});
	}

	useEffect(() => {
		console.log('useEffect');
		if (errors?.errors) {
			console.log('ada error validasi');
			for (const error of errors.errors) {
				form.setError(
					error.path[0] as keyof typeof registerSchema.shape,
					{
						type: 'custom',
						message: error.message,
					}
				);
			}
		}
	}, [errors, form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid w-full items-center gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Enter your name"
										disabled={form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										placeholder="Enter your email"
										disabled={form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter your password"
										disabled={form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormItem className="ml-auto">
						<Button asChild variant="outline">
							<Link to="/login">Login</Link>
						</Button>
						<Button
							disabled={form.formState.isSubmitting}
							className="ml-2"
						>
							{form.formState.isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : null}
							Register
						</Button>
					</FormItem>
				</div>
			</form>
		</Form>
	);
}
