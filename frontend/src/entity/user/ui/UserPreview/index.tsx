"use client"

import { useGetUser } from "@entity/user/model/useGetUser"
import { Avatar, AvatarFallback, AvatarImage } from "@share/ui/Avatar"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface UserPreviewComponents {
	Skeleton: typeof UserPreviewSkeleton
}

export const UserPreview: UserPreviewComponents & FC = () => {
	const { data: user } = useGetUser()

	if (!user || typeof user === "string") {
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
