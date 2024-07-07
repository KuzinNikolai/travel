"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@share/ui"
import { useEffect, type FC } from "react"
import { useForm } from "react-hook-form"
import { firstInfoSchema, type FirstInformation } from "../../consts/schemes"
import { useRegistrationFormStore } from "../../model/store"

interface FirstInfoProps {
	next: () => void
	goToStep: (step: number) => void
}

export const FirstInfo: FC<FirstInfoProps> = ({ next, goToStep }) => {
	const { setFormData, setStep, currentStep } = useRegistrationFormStore()

	const form = useForm<FirstInformation>({ resolver: zodResolver(firstInfoSchema) })

	const onSubmit = form.handleSubmit(async (data: FirstInformation) => {
		setFormData(data)
		setStep(1)
		next()
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
					disabled={!form.formState.isValid || form.formState.isSubmitting}
					className='w-full'
				>
					перейти к следующему шагу
				</Button>
			</form>
		</Form>
	)
}
