import { Typography } from "@share/ui/Text"
import type { FC } from "react"
import type { Advantage } from "./domain"

export interface AdvantageProps extends Advantage {}

export const AdvantageItem: FC<AdvantageProps> = ({ icon, iconLabel, title, description }) => {
	return (
		<li className='flex min-w-[194px] flex-col gap-sm rounded-md bg-base-160 p-sm'>
			<div className='flex flex-row items-center gap-sm'>
				<label
					className='hidden'
					form='time'
				>
					{iconLabel}
				</label>
				<div className='flex h-[46px] w-[46px] items-center justify-center [&>svg]:h-[44px] [&>svg]:w-[44px] [&>svg]:stroke-1'>
					{icon}
				</div>
				<Typography
					variant='h7'
					as='h3'
					textWidth='semibold'
					className='hyphens-manual'
				>
					{title}
				</Typography>
			</div>
			<Typography
				variant='contentPrimary'
				textWidth='light'
				className='text-primary-400'
			>
				{description}
			</Typography>
		</li>
	)
}
