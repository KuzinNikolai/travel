import { useGetCity } from "@entity/city"
import { UserAvatar } from "@entity/user"
import type { User } from "@share/schemas"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import { useEffect, type FC } from "react"

interface UserInfoItemProps {
	label: string
	value: string
}

const UserInfoItem: FC<UserInfoItemProps> = ({ label, value }) => {
	return (
		<div className='mb-2 flex w-full flex-col items-center justify-center'>
			<Typography
				variant='h7'
				className='text-base-20'
			>
				{label.toLowerCase()}
			</Typography>
			<Typography
				variant='h5'
				textWidth='normal'
				className='text-base-0'
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
	const t = useTranslations("pages.profile")

	const { query, fetchRun } = useGetCity()

	useEffect(() => {
		if (!user.city) return
		fetchRun(user.city)
	}, [user.city, fetchRun])

	return (
		<div className='flex w-full flex-col items-center justify-center'>
			{user.is_staff && (
				<Typography
					as='p'
					className='mb-2'
				>
					{t("userInfo.guideIn", { country: query.data?.name })}
				</Typography>
			)}
			<UserAvatar
				className='my-5'
				photo={user.photo}
				username={user.username}
				firstName={user.first_name}
				lastName={user.last_name}
				size={{ width: 90, height: 90 }}
			/>
			<UserInfoItem
				label={t("userInfo.userName")}
				value={user.username}
			/>
			<UserInfoItem
				label={t("userInfo.email")}
				value={user.email}
			/>
		</div>
	)
}
