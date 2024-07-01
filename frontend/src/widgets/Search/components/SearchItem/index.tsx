import { Icon } from "@/components/Icon"
import { Typography } from "@/components/Typography"
import type { ISearchItem } from "@/entities/search.entity"
import Link from "next/link"
import type { FC } from "react"

export const SearchItem: FC<ISearchItem> = ({ citySlug, tourSlug, title }) => {
	return (
		<li>
			<Link
				href={tourSlug ? `/${citySlug}/${tourSlug}` : `/${citySlug}`}
				onClick={() => {
					document.body.style.overflow = "auto"
					document.body.style.pointerEvents = "auto"
				}}
				className='flex items-center gap-2 hover:text-accent hover:[&_svg]:stroke-accent'
			>
				<Icon name={tourSlug ? "LocateFixed" : "Map"} />
				<Typography
					variant='content2'
					as='p'
				>
					{title}
				</Typography>
			</Link>
		</li>
	)
}
