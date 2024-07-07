"use client"

import { AvatarFallback, AvatarImage } from "@share/ui"
import { Popover, PopoverContent, PopoverTrigger } from "@share/ui"
import { Button } from "@share/ui"
import { Skeleton } from "@share/ui"
import { Typography } from "@share/ui"
import { Avatar } from "@radix-ui/react-avatar"
import { useGetUser, useUserTokenStore } from "@entity/user"
import { useAuthStore } from "@widget/Auth/model/store"
import { useLogout } from "@feature/logout"

export const UserInfo = () => {
	const { setModal } = useAuthStore()
	const { getToken } = useUserTokenStore()
	const { data: user, isLoading: loading } = useGetUser()
	const { logout } = useLogout()

	if (!getToken()) {
		return (
			<Button
				variant='ghost'
				className='w-full items-center justify-center'
				onClick={() => setModal("auth", true)}
			>
				Авторизоваться
			</Button>
		)
	}

	if (loading) {
		return (
			<div className='grid grid-cols-[40px_1fr] items-center gap-2'>
				<Skeleton className='h-10 w-10 rounded-full' />
				<Skeleton className='h-10 w-20 rounded-full' />
			</div>
		)
	}

	return user && !("code" in user) ? (
		<Popover>
			{/* <PopoverTrigger asChild>
				<button
					type='button'
					className='grid grid-cols-[40px_1fr] items-center gap-2'
				>
					{user.photo ? (
						<Avatar>
							<AvatarImage
								src={user.photo}
								className='h-10 w-10 rounded-full object-cover object-center'
							/>
							<AvatarFallback>
								<Skeleton className='h-10 w-10 rounded-full' />
							</AvatarFallback>
						</Avatar>
					) : (
						<div className='flex h-10 w-10 flex-col items-center justify-center rounded-full bg-gray-300/60'>
							{user.first_name[0].toLocaleUpperCase()}
							{user.last_name[0].toLocaleUpperCase()}
						</div>
					)}
					<Typography
						variant='span'
						as='p'
						textWidth='light'
						className='truncate text-left'
					>
						{user.first_name} {user.last_name}
					</Typography>
				</button>
			</PopoverTrigger>
			<PopoverContent>
				<Button
					className='w-full'
					variant='destructive'
					onClick={() => {
						logout()
					}}
				>
					Выйти
				</Button>
			</PopoverContent> */}
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
