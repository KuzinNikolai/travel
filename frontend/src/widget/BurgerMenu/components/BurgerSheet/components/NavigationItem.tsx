import { Typography } from "@share/ui/Text"
import type { Navigation } from "@entity/navigation.entity"
import Link from "next/link"
import type { FC } from "react"

interface INavigationItemProps {
	navigation: Navigation
}

export const NavigationItem: FC<INavigationItemProps> = ({ navigation }) => {
	return (
		<Link
			href={navigation.href}
			className='grid grid-cols-[24px_1fr] items-center gap-2 border-b-[1px] border-b-primary-400 pb-2'
		>
			{navigation.icon}
			<div className='flex flex-col justify-center gap-1'>
				<Typography
					textWidth='semibold'
					className='truncate'
				>
					{navigation.name}
				</Typography>
				{navigation.description && (
					<Typography
						textWidth='light'
						className='truncate'
					>
						{navigation.description}
					</Typography>
				)}
			</div>
		</Link>
	)
}
