"use client"

import { UserPreview, useUser } from "@entity/user"
import { Button } from "@share/ui/Buttons"
import { Typography } from "@share/ui/Text"
import { useAuthStore } from "@widget/Auth"
import Link from "next/link"

export const UserInfo = () => {
	const { setExpand } = useAuthStore()

	const {
		query: { data, isLoading },
		isAuthorized,
	} = useUser()

	if (!isAuthorized) {
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

	if (isLoading) {
		return <UserPreview.Skeleton />
	}

	return data ? (
		<Link href='/profile'>
			<UserPreview />
		</Link>
	) : (
		<Typography
			textWidth='light'
			className='text-danger'
		>
			Не удалось получить информацию о пользователе
		</Typography>
	)
}
