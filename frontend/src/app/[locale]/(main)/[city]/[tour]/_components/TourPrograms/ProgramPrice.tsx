import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface PriceProps {
	title: string
	currency: string
	price: number
}

export const TourPrice: FC<PriceProps> = ({ title, currency, price }) => {
	return (
		<Typography
			variant='contentPrimary'
			as='h3'
			className='flex flex-nowrap gap-2 text-primary-400'
		>
			{title}:
			<Typography
				variant='contentPrimary'
				className='text-primary'
			>
				{currency} {price}
			</Typography>
		</Typography>
	)
}
