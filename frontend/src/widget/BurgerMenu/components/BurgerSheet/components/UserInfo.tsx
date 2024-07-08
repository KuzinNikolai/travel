"use client"

import { UserPreview, useGetUser } from "@entity/user"
import { useLogout } from "@feature/logout"
import { logger } from "@share/lib"
import { Button } from "@share/ui/Buttons"
import { Popover, PopoverContent, PopoverTrigger } from "@share/ui/Popover"
import { Typography } from "@share/ui/Text"
import { useAuthStore } from "@widget/Auth"

export const UserInfo = () => {
	const { setExpand } = useAuthStore()
	const { logout } = useLogout()
	const { data, query } = useGetUser()

	if (query.isFetched && !query.data || data === "UNAUTHORIZED") {
		return (
			<Button
				variant='ghost'
				className='w-full items-center justify-center'
				onClick={() => setExpand(true)}
			>
				Авторизоваться
			</Button>
		)
	}

	if (!data && query.isLoading) {
		return <UserPreview.Skeleton />
	}

	return data && typeof data !== "string" ? (
		<Popover>
			<PopoverTrigger>
				<UserPreview />
			</PopoverTrigger>
			<PopoverContent>
				<Button
					className='w-full'
					variant='destructive'
					onClick={() => logout()}
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
