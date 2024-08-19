"use client"

import { LoginForm } from "@feature/auth/login"
import { RegistrationForm } from "@feature/auth/registration"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import { useCallback, useState } from "react"
import { useAuthStore } from "../model/useAuthStore"
import { Button } from "@share/ui/Buttons"

export const Auth = () => {
	const { auth, setExpand } = useAuthStore()
	const [tab, setTab] = useState<"login" | "registration">("login")

	const onOpenChange = (open: boolean) => !open && setExpand(false)
	const onClose = useCallback(() => setExpand(false), [])

	return (
		<Dialog
			open={auth}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<Typography variant='h1'>{tab === "login" ? "Вход" : "Регистрация"}</Typography>
				</DialogHeader>
				{tab === "login" ? <LoginForm onFinish={onClose} /> : <RegistrationForm onFinish={onClose} />}
				<DialogFooter className='items-center justify-start gap-1 sm:justify-start'>
					{tab === "login" ? (
						<>
							<Typography>У вас нет аккаунта?</Typography>
							<Button
								variant="ghost"
								className="normal-case"
								onClick={() => setTab("registration")}
							>
								Зарегистрироваться
							</Button>
						</>
					) : (
						<>
							<Typography>Уже есть аккаунт?</Typography>
							<Button
								variant='ghost'
								className="normal-case"
								onClick={() => setTab("login")}
							>
								Войти
							</Button>
						</>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
