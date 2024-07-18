"use client"

import { useUser } from "@entity/user/model/useUser"
import { Avatar, AvatarFallback, AvatarImage } from "@share/ui/Avatar"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface UserPreviewComponents {
	Skeleton: typeof UserPreviewSkeleton
}

export const UserPreview: UserPreviewComponents & FC = () => {
	const { data: user } = useUser()

	if (!user) {
		return null
	}

	return (
		<div className='grid grid-cols-[40px_1fr] items-center gap-2'>
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
				<Typography
					variant='h4'
					as='p'
					className='flex h-10 w-10 flex-col items-center justify-center rounded-full bg-gray-300/60'
				>
					{user.first_name && user.last_name
						? user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()
						: user.username.charAt(0).toUpperCase()}
				</Typography>
			)}
			<Typography
				variant='content1'
				as='p'
				textWidth='light'
				className='truncate text-left'
			>
				{user.username}
			</Typography>
		</div>
	)
}

const UserPreviewSkeleton = () => (
	<div className='grid grid-cols-[40px_1fr] items-center gap-2'>
		<Skeleton className='h-10 w-10 rounded-full' />
		<div className='flex gap-1'>
			<Skeleton className='h-6 w-16 rounded-full' />
			<Skeleton className='h-6 w-20 rounded-full' />
		</div>
	</div>
)
UserPreview.Skeleton = UserPreviewSkeleton
