"use client"

import { LoginForm } from "@feature/login"
// import { RegistrationForm } from "@feature/?_registration"
import { Dialog, DialogContent, DialogFooter, DialogHeader, Typography } from "@share/ui"
import { useCallback, useState } from "react"
import { useAuthStore } from "../model/store"

export const Auth = () => {
	const { auth, setModal } = useAuthStore()
	const [tab, setTab] = useState<"login" | "registration">("login")

	const onClose = useCallback(() => setModal("auth", false), [setModal])

	return (
		<Dialog
			open={auth}
			onOpenChange={(open) => !open && setModal("auth", false)}
		>
			<DialogContent>
				<DialogHeader>
					<Typography variant='h1'>{tab === "login" ? "Вход" : "Регистрация"}</Typography>
				</DialogHeader>
				{/* {tab === "login" ? <LoginForm onFinish={onClose} /> : <RegistrationForm onFinish={onClose} />} */}
				<DialogFooter className='items-center justify-start gap-1 sm:justify-start'>
					{tab === "login" ? (
						<>
							<Typography variant='span'>У вас нет аккаунта?</Typography>
							<button
								className='text-accent'
								type='button'
								onClick={() => setTab("registration")}
							>
								Зарегистрироваться
							</button>
						</>
					) : (
						<>
							<Typography variant='span'>Уже есть аккаунт?</Typography>
							<button
								className='text-accent'
								type='button'
								onClick={() => setTab("login")}
							>
								Войти
							</button>
						</>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
