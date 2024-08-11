import { Typography } from "@share/ui/Text"
import type { IAdvantage } from "@entity/advantage.entity"
import type { FC } from "react"

export interface IAdvantageProps {
	advantage: IAdvantage
}

export const Advantage: FC<IAdvantageProps> = ({ advantage }) => {
	return (
		<li className='flex min-w-[194px] flex-col gap-sm rounded-md bg-base-160 p-sm'>
			<div className='flex flex-row items-center gap-sm'>
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
					variant='h7'
					as='h3'
					textWidth='semibold'
					className='hyphens-manual'
				>
					{advantage.title}
				</Typography>
			</div>
			<Typography
				variant='contentPrimary'
				textWidth='light'
				className='text-primary-400'
			>
				{advantage.description}
			</Typography>
		</li>
	)
}
