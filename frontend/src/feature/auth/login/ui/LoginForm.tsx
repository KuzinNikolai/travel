import { zodResolver } from "@hookform/resolvers/zod";
import { __PROD__ } from "@share/constants/environment";
import { print } from "@share/packages/logger";
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
import { useTranslations } from "next-intl";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useLogin } from "../model/hooks/useLogin";
import { loginRequestSchema } from "../model/schema";

interface LoginFormProps {
	onFinish: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onFinish }) => {
	const t = useTranslations();

	const login = useLogin();

	const form = useForm<z.infer<typeof loginRequestSchema>>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginRequestSchema),
		reValidateMode: "onBlur",
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await login.mutateAsync(data);
	});

	useEffect(() => {
		if (login.isSuccess) onFinish();
	}, [onFinish, login.isSuccess]);

	const isDisableSubmitButton = !form.formState.isValid || login.isPending;

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="space-y-3">
				<FormField
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>* {t("components.auth.fields.email")}</FormLabel>
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
							<FormLabel>* {t("components.auth.fields.password")}</FormLabel>
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
					disabled={isDisableSubmitButton}
				>
					{t("components.auth.login.title")}
				</Button>
			</form>
		</Form>
	);
};
