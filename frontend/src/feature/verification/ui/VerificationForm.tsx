import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	InputOTP,
	InputOTPSlot,
	Typography,
} from "@share/ui"
import { useVerifyCode } from "../model/useVerifyCode"

export const VerificationForm = () => {
	const { form, formRef, onSubmit, onChangeCode } = useVerifyCode()

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className='space-y-3'
				ref={formRef}
			>
				<FormField
					name='code'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Код</FormLabel>
							<FormControl>
								<InputOTP
									maxLength={6}
									{...field}
									onChange={onChangeCode}
									className='!gap-[0.4rem] w-full'
									disabled={form.formState.isSubmitting}
								>
									<InputOTPSlot
										index={0}
										className='flex-1'
									/>
									<InputOTPSlot
										index={1}
										className='flex-1'
									/>
									<InputOTPSlot
										index={2}
										className='flex-1'
									/>
									<InputOTPSlot
										index={3}
										className='flex-1'
									/>
									<InputOTPSlot
										index={4}
										className='flex-1'
									/>
									<InputOTPSlot
										index={5}
										className='flex-1'
									/>
								</InputOTP>
							</FormControl>
							<FormMessage />
							<Typography variant='span'>
								Проверьте почту на код подтверждения. Если его нет, посмотрите в папке "спам".{" "}
							</Typography>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
