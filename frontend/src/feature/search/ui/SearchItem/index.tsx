import { Icon, Skeleton, Typography } from "@share/ui"
import Link from "next/link"
import type { FC } from "react"
import type { z } from "zod"
import type { searchItemSchema } from "../../consts/search.schema"

interface SearchElements {
	Skeleton: typeof SearchItemLoading
}

const SearchItem: SearchElements & FC<z.infer<typeof searchItemSchema>> = ({ citySlug, tourSlug, title }) => {
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

const SearchItemLoading = () => {
	return (
		<li
			aria-label='Загрузка'
			className='flex items-center gap-2'
		>
			<Skeleton className='h-4 w-4' />
			<Skeleton className='h-4 w-[60vw]' />
		</li>
	)
}
SearchItem.Skeleton = SearchItemLoading

export { SearchItem }
