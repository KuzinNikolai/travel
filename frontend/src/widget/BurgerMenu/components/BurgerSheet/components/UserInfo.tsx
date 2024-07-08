"use client"

import { useGetUser, useUserTokenStore } from "@entity/user"
import { useAuthStore } from "@widget/Auth"
import { useLogout } from "@feature/logout"
import { Button } from "@share/ui/Buttons"
import { Skeleton } from "@share/ui/Skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "@share/ui/Popover"
import { Typography } from "@share/ui/Text"
import { Avatar, AvatarFallback, AvatarImage } from "@share/ui/Avatar"
import { useEffect } from "react"
import { logger } from "@share/lib"

export const UserInfo = () => {
	const { setExpand } = useAuthStore()
	const { getToken } = useUserTokenStore()
	// useGetUser()
	// const { logout } = useLogout()

	useEffect(() => {
		setExpand(true)
	}, [])

	// if (!getToken()) {
	// 	return (
	// 		<Button
	// 			variant='ghost'
	// 			className='w-full items-center justify-center'
	// 			onClick={() => setModal("auth", true)}
	// 		>
	// 			Авторизоваться
	// 		</Button>
	// 	)
	// }

	// if (loading) {
	// 	return (
	// 		<div className='grid grid-cols-[40px_1fr] items-center gap-2'>
	// 			<Skeleton className='h-10 w-10 rounded-full' />
	// 			<Skeleton className='h-10 w-20 rounded-full' />
	// 		</div>
	// 	)
	// }

	// return user && !("code" in user) ? (
	// 	<Popover>
	// 		<PopoverTrigger asChild>
	// 			<button
	// 				type='button'
	// 				className='grid grid-cols-[40px_1fr] items-center gap-2'
	// 			>
	// 			</button>
	// 		</PopoverTrigger>
	// 		<PopoverContent>
	// 			<Button
	// 				className='w-full'
	// 				variant='destructive'
	// 				onClick={() => {
	// 					logout()
	// 				}}
	// 			>
	// 				Выйти
	// 			</Button>
	// 		</PopoverContent>
	// 	</Popover>
	// ) : (
	return (
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
