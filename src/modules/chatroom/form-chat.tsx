import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FormChatType = {
	onSendMessage: (message: string) => void;
};

const chatSchema = z.object({
	message: z.string().min(1),
});

export default function FormChat({ onSendMessage }: FormChatType) {
	const form = useForm<z.infer<typeof chatSchema>>({
		resolver: zodResolver(chatSchema),
		defaultValues: { message: '' },
	});

	async function onSubmit(values: z.infer<typeof chatSchema>) {
		// await new Promise((r) => setTimeout(r, 2000));
		console.log(values);
		onSendMessage(values.message);
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex gap-2 justify-center">
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Type your message"
										disabled={form.formState.isSubmitting}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormItem className="ml-auto">
						<Button
							disabled={form.formState.isSubmitting}
							size="icon"
							className="rounded-full bg-emerald-500 hover:bg-emerald-400"
						>
							<SendHorizontal className="w-5 h-5" />
						</Button>
					</FormItem>
				</div>
			</form>
		</Form>
	);
}
