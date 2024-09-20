import { cn } from "@share/packages/tailwindHelpers"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import type { FC, HTMLAttributes } from "react"

interface ListItemProps extends HTMLAttributes<HTMLElement> {
	title: string
}

export const ListItem: FC<ListItemProps> & { Skeleton: typeof ListItemSkeleton } = ({ title, children, ...props }) => {
	return (
		<li
			{...props}
			className={cn("grid grid-cols-2 items-center justify-between", props.className)}
		>
			<Typography>{title}:</Typography>
			<div className={cn("w-full text-end")}>{children}</div>
		</li>
	)
}

const ListItemSkeleton: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => (
	<div
		{...props}
		className={cn("grid grid-cols-2 items-center justify-between", props.className)}
	>
		<Skeleton className='h-6 w-1/2' />
		<div className="flex w-full justify-end">{children}</div>
	</div>
)
ListItem.Skeleton = ListItemSkeleton
