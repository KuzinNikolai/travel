"use client"

import { UserPreview, useUser, useUserTokenStore } from "@entity/user"
import { useLogout } from "@feature/logout"
import { Button } from "@share/ui/Buttons"
import { Popover, PopoverContent, PopoverTrigger } from "@share/ui/Popover"
import { Typography } from "@share/ui/Text"
import { useAuthStore } from "@widget/Auth"
import { useMemo } from "react"

export const UserInfo = () => {
	const { setExpand } = useAuthStore()
	const userToken = useUserTokenStore()
	const { data, error, isLoading } = useUser()
	
	const logout = useLogout()

	const token = useMemo(() => userToken.getToken(), [userToken])

	if (!token ||error?.code === "INPUT_PARSE_ERROR" || error?.code === "NOT_AUTHORIZED") {
		return (
			<Button
				variant='ghost'
				className='w-full items-center justify-center'
				disabled={isLoading}
				onClick={() => setExpand(true)}
			>
				Авторизоваться
			</Button>
		)
	}

	if (!data && isLoading) {
		return <UserPreview.Skeleton />
	}

	return data ? (
		<Popover>
			<PopoverTrigger>
				<UserPreview />
			</PopoverTrigger>
			<PopoverContent>
				<Button
					className='w-full'
					variant='destructive'
					onClick={() => logout.mutateAsync(token)}
				>
					Выйти
				</Button>
			</PopoverContent>
		</Popover>
	) : (
		<Typography
			variant='span'
			as='p'
			textWidth='light'
			className='text-danger'
		>
			Не удалось получить информацию о пользователе
		</Typography>
	)
}
