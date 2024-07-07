import { Typography } from "@share/ui"
import type { INavigation } from "@entity/navigation.entity"
import Link from "next/link"
import type { FC } from "react"

interface INavigationItemProps {
	navigation: INavigation
}

export const NavigationItem: FC<INavigationItemProps> = ({ navigation }) => {
	return (
		<Link
			href={navigation.href}
			className='grid grid-cols-[24px_1fr] items-center gap-2 border-b-[1px] border-b-primary-400 pb-2'
		>
			{navigation.icon}
			<div className='flex flex-col gap-1'>
				<Typography
					variant='span'
					as='p'
					textWidth='semibold'
					className='truncate'
				>
					{navigation.name}
				</Typography>
				<Typography
					variant='span'
					as='p'
					textWidth='light'
					className='truncate'
				>
					{navigation.description}
				</Typography>
			</div>
		</Link>
	)
}
