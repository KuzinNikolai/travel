import { UserAvatar, type User } from "@entity/user"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface UserInfoItemProps {
	label: string
	value: string
}

const UserInfoItem: FC<UserInfoItemProps> = ({ label, value }) => {
	return (
		<div className='mb-4 flex w-full flex-col items-center justify-center'>
			<Typography
				variant='h5'
				as='p'
				className='mb-2 text-primary-400'
			>
				{label}
			</Typography>
			<Typography
				variant='h4'
				as='p'
				className='text-primary'
			>
				{value}
			</Typography>
		</div>
	)
}

interface UserInfoProps {
	user: User
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
	return (
		<div className='flex w-full flex-col items-center justify-center'>
			{user.is_staff && (
				<Typography
					variant='content1'
					as='p'
					className='mb-4'
				>
					Гид в {user.city}
				</Typography>
			)}
			<UserAvatar
				className='m-10'
				photo={user.photo}
				username={user.username}
				firstName={user.first_name}
				lastName={user.last_name}
				size={{
					width: 90,
					height: 90,
				}}
			/>
			<UserInfoItem
				label='username'
				value={user.username}
			/>
			<UserInfoItem
				label='email'
				value={user.email}
			/>
		</div>
	)
}
