"use client"

import { Button } from "@share/ui/Buttons"
import { FieldItem } from "./FieldItem"
import { useLogout } from "@feature/auth/logout"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeyFactory } from "@share/packages/serverActions"

export const LogoutField = () => {
	const t = useTranslations()

	const queryClient = useQueryClient()
	const logout = useLogout()

	useEffect(() => {
		if (!logout.isSuccess) {
			logout.reset()
			return
		}

		queryClient.invalidateQueries({ queryKey: queryKeyFactory.user() })
	}, [logout, queryClient])

	return (
		<FieldItem>
			<Button
				variant='ghost'
				onClick={() => logout.mutateAsync(undefined)}
				className='!justify-start !py-6 w-full rounded-none text-danger'
			>
				{t("pages.profile.actions.logout")}
			</Button>
		</FieldItem>
	)
}
