import { Typography } from "@/components/Typography"
import type { IAdvantage } from "@/entities/advantage.entity"
import type { FC } from "react"

export interface IAdvantageProps {
	advantage: IAdvantage
}

export const Advantage: FC<IAdvantageProps> = ({ advantage }) => {
	return (
		<li className='flex min-w-[194px] flex-col gap-2 rounded-lg bg-background p-3'>
			<div className='flex flex-row items-center gap-2'>
				<label
					className='hidden'
					form='time'
				>
					{advantage.iconLabel}
				</label>
				<div className='flex h-[46px] w-[46px] items-center justify-center [&>svg]:h-[44px] [&>svg]:w-[44px] [&>svg]:stroke-1'>
					{advantage.icon}
				</div>
				<Typography
					variant='h3'
					as='h3'
					textWidth='semibold'
					className='content-center hyphens-manual text-lg'
				>
					{advantage.title}
				</Typography>
			</div>
			<Typography
				variant='content1'
				textWidth='light'
				className='text-primary-400'
			>
				{advantage.description}
			</Typography>
		</li>
	)
}
