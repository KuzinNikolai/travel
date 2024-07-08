"use client"

import { firstInfoSchema, type FirstInformation } from "@feature/registration/consts/schemes"
import { RegistrationSteps, useRegistrationFormStore } from "@feature/registration/model/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { logger } from "@share/lib"
import { Button } from "@share/ui/Buttons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { Input } from "@share/ui/Inputs"
import { useEffect, type FC } from "react"
import { useForm } from "react-hook-form"

interface FirstInfoProps {
	goToStep: (step: RegistrationSteps) => void
}

export const FirstInfo: FC<FirstInfoProps> = ({ goToStep }) => {
	const { setFormData, setStep, currentStep } = useRegistrationFormStore()

	const form = useForm<FirstInformation>({
		defaultValues: { email: "", password: "" },
		resolver: zodResolver(firstInfoSchema),
	})

	const onSubmit = form.handleSubmit(async (data: FirstInformation) => {
		setFormData(data)
		setStep(RegistrationSteps.AdditionalInfo)
		goToStep(RegistrationSteps.AdditionalInfo)
	})

	useEffect(() => {
		if (currentStep !== 0) {
			goToStep(currentStep)
		}
	}, [])

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
						logger.debug(field),
						(
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
						)
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
					disabled={!form.formState.isValid || form.formState.isSubmitting}
					className='w-full'
				>
					перейти к следующему шагу
				</Button>
			</form>
		</Form>
	)
}
