"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { __DEV__ } from "@share/constants/environment";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoginDataStore } from "../../model/hooks/useLoginData";
import { useRegistration } from "../../model/hooks/useRegistration";
import {
	RegistrationSteps,
	useRegistrationStepsStore,
} from "../../model/hooks/useRegistrationSteps";
import {
	type RegistrationData,
	registrationDataSchema,
} from "../../model/schema";

export const FirstInfo = () => {
	const t = useTranslations();

	const { setStep, currentStep } = useRegistrationStepsStore();
	const { setData } = useLoginDataStore();

	const registration = useRegistration();

	const form = useForm<RegistrationData>({
		defaultValues: { email: "", password: "" },
		resolver: zodResolver(registrationDataSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		registration.mutateAsync({
			email: data.email,
			password: data.password,
		});

		setData(data);
	});

	useEffect(() => {
		if (currentStep !== 0) {
			setStep(currentStep);
		}
	}, [setStep, currentStep]);

	useEffect(() => {
		if (registration.isSuccess) setStep(RegistrationSteps.Verify);
	}, [setStep, registration.isSuccess]);

	useEffect(() => {
		form.setFocus("email");
	}, [form]);

	if (__DEV__) {
		print.debug(
			"Form state",
			form.formState,
			form.getValues(),
			form.formState.errors,
			{
				isDirty: form.formState.isDirty,
				isValid: form.formState.isValid,
			},
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="space-y-3">
				<FormField
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>* {t("components.auth.fields.email")}</FormLabel>
							<FormControl>
								<Input type="text" {...field} required />
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
									autoComplete="new-password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					variant="primary"
					type="submit"
					disabled={!form.formState.isValid || registration.isPending}
					className="w-full"
				>
					{t("components.auth.register.title")}
				</Button>
			</form>
		</Form>
	);
};
