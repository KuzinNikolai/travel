import { Icon, type IconsName } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface OfferTourItemProps {
	icon: IconsName
	label: string
	description: string
}

export const OfferTourItem: FC<OfferTourItemProps> = ({ label, description, icon }) => {
	return (
		<li className='flex gap-3'>
			<Icon
				name={icon}
				className='mt-1 min-h-9 min-w-9'
			/>
			<div className='flex flex-col gap-1'>
				<Typography
					variant='h6'
					as='h3'
					className='text-base-20'
				>
					{label}
				</Typography>
				<Typography className='text-base-40'>{description}</Typography>
			</div>
		</li>
	)
}
