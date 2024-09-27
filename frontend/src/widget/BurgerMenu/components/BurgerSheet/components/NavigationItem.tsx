import { Typography } from "@share/ui/Text"
import Link from "next/link"
import type { FC } from "react"
import type { Navigation } from ".."

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
			<Typography
				textWidth='semibold'
				className='truncate'
			>
				{navigation.name}
			</Typography>
			{navigation.description && (
				<Typography
					textWidth='light'
					className='col-span-3'
				>
					{navigation.description}
				</Typography>
			)}
		</Link>
	)
}
