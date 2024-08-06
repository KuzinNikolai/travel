import { useGetCity } from "@entity/city"
import { UserAvatar, type User } from "@entity/user"
import { Typography } from "@share/ui/Text"
import { useEffect, type FC } from "react"

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
	const { query, fetchRun } = useGetCity()

	useEffect(() => {
		if (!user.city) return
		fetchRun(user.city)
	}, [user.city, fetchRun])

	return (
		<div className='flex w-full flex-col items-center justify-center'>
			{user.is_staff && (
				<Typography
					variant='content1'
					as='p'
					className='mb-4'
				>
					Гид в {query.isLoading ? "загружается..." : query.data?.name}
				</Typography>
			)}
			<UserAvatar
				className='m-10'
				photo={user.photo}
				username={user.username}
				firstName={user.first_name}
				lastName={user.last_name}
				size={{ width: 90, height: 90 }}
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
