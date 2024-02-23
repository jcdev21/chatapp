import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from './form-schema';
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
import { Link } from 'react-router-dom';
import { loginWithEmailAndPassword } from './api-login';
import { setAccessTokenCookie, setUserCookie } from '@/lib/utils';

export default function FormLogin() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log(values);

		try {
			const response = await loginWithEmailAndPassword(values);
			const result = await response.json();
			const { accessToken, ...user } = result.data;
			setAccessTokenCookie(accessToken);
			setUserCookie(user);
			window.location.replace('/');
		} catch (error) {
			console.log('ERROR : ', error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid w-full items-center gap-4">
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
							<Link to="/register">Register</Link>
						</Button>
						<Button
							disabled={form.formState.isSubmitting}
							className="ml-2"
						>
							{form.formState.isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : null}
							Login
						</Button>
					</FormItem>
				</div>
			</form>
		</Form>
	);
}
