"use client"

import { SafeJson } from "@/packages/utils/SafeJson"
import { logger } from "@/packages/utils/logger"
import { useToast } from "@/widgets/Toaster"
import { clientLogout } from "@packages/API/fetches/auth/client"
import { useUserPersistStore } from "@packages/stores/user"
import { usePathname } from "next/navigation"
import { useCallback } from "react"

export const useLogout = () => {
	const pathname = usePathname()

	const { getToken, setToken } = useUserPersistStore()
	const { toast } = useToast()

	const logout = useCallback(async () => {
		let res: Response | null = null

		const token = getToken()

		if (!token) {
			return false
		}

		try {
			res = await clientLogout(token)
		} catch (e) {
			logger.error(e)
			return false
		}

		const resText = await res.text()

		if (!res.ok) {
			const json = SafeJson.parse(resText) as Record<string, string>

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

		setToken(null)
		toast({ title: "Успешно", description: "Вы вышли из аккаунта" })

		return true
	}, [pathname])

	return logout
}
