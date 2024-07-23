"use client"

import { cn } from "@share/lib"
import { Avatar } from "@share/ui/Avatar"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import type { FC, HTMLAttributes } from "react"

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
	photo: string | null
	username: string
	firstName: string | null
	lastName: string | null
	size?: {
		width: number
		height: number
	}
}

export const UserAvatar: FC<UserAvatarProps> = ({ size, photo, username, firstName, lastName, ...props }) => {
	const avatarSize = size || { width: 40, height: 40 }

	return (
		<div
			{...props}
			className={cn("flex flex-col items-center justify-center rounded-full bg-gray-300/60", props.className)}
			style={{ ...props.style, width: avatarSize.width, height: avatarSize.height }}
		>
			{photo ? (
				<Avatar.Root className="h-full w-full">
					<Avatar.Image
						src={photo}
						className='h-full w-full rounded-full object-cover object-center'
					/>
					<Avatar.Fallback>
						<Skeleton className='h-full w-full rounded-full' />
					</Avatar.Fallback>
				</Avatar.Root>
			) : (
				<Typography
					variant='h4'
					as='p'
					style={{ fontSize: avatarSize.height / 2 }}
				>
					{firstName && lastName
						? firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
						: username.charAt(0).toUpperCase()}
				</Typography>
			)}
		</div>
	)
}
