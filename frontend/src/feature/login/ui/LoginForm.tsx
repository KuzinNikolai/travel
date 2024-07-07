import { loginRequestSchema, type LoginRequest } from "@api/auth/login/_schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@share/ui"
import { useEffect, type FC } from "react"
import { useForm } from "react-hook-form"
import { useLogin } from "../model/useLogin"

interface LoginFormProps {
	onFinish: () => void
}

export const LoginForm: FC<LoginFormProps> = ({ onFinish }) => {
	const { loginAsync, isLoading } = useLogin()

	const form = useForm<LoginRequest>({ resolver: zodResolver(loginRequestSchema) })

	const onSubmit = form.handleSubmit(async (data: LoginRequest) => {
		loginAsync(data)
		onFinish()
	})

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
							<FormLabel>* Ваша почта</FormLabel>
							<FormControl>
								<Input
									type='email'
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
							<FormLabel>* Ваш пароль</FormLabel>
							<FormControl>
								<Input
									type='password'
									{...field}
									required
									autoComplete='current-password webauthn'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					variant='secondary'
					type='submit'
					disabled={!form.formState.isValid || isLoading}
				>
					Войти
				</Button>
			</form>
		</Form>
	)
}
