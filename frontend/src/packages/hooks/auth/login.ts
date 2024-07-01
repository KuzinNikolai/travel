"use client"

import { logger } from "@/packages/utils/logger"
import { useToast } from "@/widgets/Toaster"
import { clientLogin } from "@packages/API/fetches/auth/client"
import type { LoginRequest } from "@packages/schemes/auth/login/client.schema"
import type { VerificationResponse } from "@packages/schemes/auth/verify/client.schema"
import { useUserPersistStore } from "@packages/stores/user"
import { usePathname } from "next/navigation"
import { useCallback } from "react"

export const useLogin = () => {
	const pathname = usePathname()

	const { setToken } = useUserPersistStore()
	const { toast } = useToast()

	const login = useCallback(
		async (loginData: LoginRequest) => {
			let res: Response | null = null

			try {
				res = await clientLogin(loginData)
			} catch (e) {
				logger.error(e)
				return false
			}

			const json = (await res.json()) as VerificationResponse

			if (!res.ok) {
				if ("token" in json) {
					return false
				}

				switch (json.code) {
					case "INVALID_RESPONSE_BODY": {
						toast({
							title: "Ошибка",
							description: "Произошла ошибка на сервере при попытке входа. Попробуйте ещё раз позже",
						})
						break
					}
					case "INVALID_CREDENTIALS": {
						toast({
							title: "Ошибка",
							description: "Неверный логин или пароль",
						})
						break
					}
					default:
						toast({ title: "Ошибка", description: "Неизвестная ошибка при попытке входа" })
				}

				return false
			}

			if ("code" in json) {
				toast({
					title: "Ошибка",
					description: "Не удалось войти. Попробуйте ещё раз позже",
				})
				return false
			}

			setToken(json.token)
			toast({ title: "Успешно", description: "Вы успешно вошли в систему" })

			return true
		},
		[pathname],
	)

	return login
}
