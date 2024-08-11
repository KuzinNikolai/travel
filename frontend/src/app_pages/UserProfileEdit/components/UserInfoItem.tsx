import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface UserInfoItemProps {
	label: string
	value: string
}

export const UserInfoItem: FC<UserInfoItemProps> = ({ label, value }) => {
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
