"use client"

import { useUser } from "@entity/user/model/useUser"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"
import { UserAvatar } from "../UserAvatar"

interface UserPreviewComponents {
	Skeleton: typeof UserPreviewSkeleton
}

export const UserPreview: UserPreviewComponents & FC = () => {
	const {
		query: { data: user },
	} = useUser()

	if (!user) {
		return null
	}

	return (
		<div className='grid grid-cols-[40px_1fr] items-center gap-2'>
			<UserAvatar
				photo={user.photo}
				username={user.username}
				firstName={user.first_name}
				lastName={user.last_name}
			/>
			<Typography
				variant='contentPrimary'
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
