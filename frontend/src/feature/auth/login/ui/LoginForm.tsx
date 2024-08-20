import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@share/ui/Buttons";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@share/ui/Form";
import { Input } from "@share/ui/Inputs";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { loginRequestSchema } from "../consts/loginActionSchema";
import { useLogin } from "../model/useLogin";

interface LoginFormProps {
	onFinish: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onFinish }) => {
	const login = useLogin();

	const form = useForm<z.infer<typeof loginRequestSchema>>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginRequestSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await login.mutateAsync(data);
	});

	useEffect(() => {
		if (login.isSuccess) onFinish();
	}, [onFinish, login.isSuccess]);

	useEffect(() => {
		form.setFocus("email");
	}, [form]);

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="space-y-3">
				<FormField
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Ваша почта</FormLabel>
							<FormControl>
								<Input type="email" {...field} required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Ваш пароль</FormLabel>
							<FormControl>
								<Input
									type="password"
									{...field}
									required
									autoComplete="current-password webauthn"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					variant="primary"
					className="w-full"
					type="submit"
					disabled={!form.formState.isValid || login.isPending}
				>
					Войти
				</Button>
			</form>
		</Form>
	);
};
