"use client"

import { firstInfoSchema, type FirstInformation } from "@feature/registration/consts/stepsData.schema"
import { useFormDataStore } from "@feature/registration/model/formDataStore"
import { RegistrationSteps, useFormStepsStore } from "@feature/registration/model/formStepStore"
import { useRegistration } from "@feature/registration/model/useRegistration"
import { zodResolver } from "@hookform/resolvers/zod"
import { logger } from "@share/lib"
import { Button } from "@share/ui/Buttons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { Input } from "@share/ui/Inputs"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const FirstInfo = () => {
	const { setStep, currentStep } = useFormStepsStore()
	const { setData } = useFormDataStore()

	const registration = useRegistration()

	const form = useForm<FirstInformation>({
		defaultValues: { email: "", password: "" },
		resolver: zodResolver(firstInfoSchema),
	})

	const onSubmit = form.handleSubmit(async (data: FirstInformation) => {
		registration.mutateAsync({
			email: data.email,
			password: data.password,
			first_name: "",
			last_name: "",
			age: null,
		})

		setData(data)
	})

	useEffect(() => {
		if (currentStep !== 0) {
			setStep(currentStep)
		}
	}, [setStep, currentStep])

	useEffect(() => {
		if (registration.isSuccess) setStep(RegistrationSteps.Verify)
	}, [setStep, registration.isSuccess])

	useEffect(() => {
		form.setFocus("email")
	}, [])

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className='space-y-3'
			>
				<FormField
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Почта</FormLabel>
							<FormControl>
								<Input
									type='text'
									{...field}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Пароль</FormLabel>
							<FormControl>
								<Input
									type='password'
									{...field}
									required
									autoComplete='new-password'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					variant='secondary'
					type='submit'
					disabled={!form.formState.isValid || registration.isPending}
					className='w-full'
				>
					Зарегистрироваться
				</Button>
			</form>
		</Form>
	)
}
