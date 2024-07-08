import { additionalInformationSchema, type AdditionalInformation } from "@feature/registration/consts/schemes"
import { RegistrationSteps, useRegistrationFormStore } from "@feature/registration/model/store"
import { useRegistration } from "@feature/registration/model/useRegistration"
import { zodResolver } from "@hookform/resolvers/zod"
import { logger } from "@share/lib"
import { Button } from "@share/ui/Buttons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { Input } from "@share/ui/Inputs"
import { useToast } from "@share/ui/Popups"
import { useEffect, type FC } from "react"
import { useForm } from "react-hook-form"

interface AdditionalInfoProps {
	goToStep: (step: RegistrationSteps) => void
}

export const AdditionalInfo: FC<AdditionalInfoProps> = ({ goToStep }) => {
	const { currentStep, setStep, getFormData } = useRegistrationFormStore()
	const { toast } = useToast()

	const { registrationMutation } = useRegistration({
		onSuccess: () => {
			setStep(RegistrationSteps.VerifyCode)
			goToStep(RegistrationSteps.VerifyCode)
		},
		onError: (code) => {
			switch (code) {
				case "INVALID_BODY": {
					setStep(RegistrationSteps.FirstInfo)
					goToStep(RegistrationSteps.FirstInfo)
					break
				}
				case "USER_ALREADY_EXISTS": {
					setStep(RegistrationSteps.FirstInfo)
					goToStep(RegistrationSteps.FirstInfo)
					break
				}
			}
		},
	})

	useEffect(() => {
		if (currentStep !== RegistrationSteps.AdditionalInfo) {
			goToStep(currentStep)
		}
	}, [])

	const form = useForm<AdditionalInformation>({
		defaultValues: {
			first_name: "",
			last_name: "",
			age: 16,
		},
		resolver: zodResolver(additionalInformationSchema),
	})

	const onSubmit = form.handleSubmit(async (data: AdditionalInformation) => {
		const formData = getFormData()

		if (!formData) {
			toast({ title: "Ошибка", description: "Не удалось получить данные формы" })
			return
		}

		registrationMutation.mutate({ ...data, ...formData })
	})

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className='space-y-3'
			>
				<FormField
					name='first_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Ваше имя</FormLabel>
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
					name='last_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Ваша фамилия</FormLabel>
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
					name='age'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Ваш возраст</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									min={16}
									max={110}
									required
									onChange={(e) => form.setValue("age", e.target.valueAsNumber)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-2 gap-1'>
					<Button
						variant='secondary'
						type='submit'
						disabled={!form.formState.isValid || form.formState.isSubmitting}
					>
						перейти к следующему шагу
					</Button>
					<Button
						type='button'
						variant='outline'
						onClick={() => goToStep(RegistrationSteps.FirstInfo)}
						disabled={!form.formState.isValid || form.formState.isSubmitting}
					>
						назад
					</Button>
				</div>
			</form>
		</Form>
	)
}
