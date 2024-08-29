import { Typography } from "@share/ui/Text"
import type { FC, PropsWithChildren, ReactNode } from "react"

interface ListItemProps {
	title: string
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({ title, children }) => {
	return (
		<li className="grid grid-cols-2 items-center justify-between">
			<Typography>{title}:</Typography>
			<div className="w-full text-end">{children}</div>
		</li>
	)
}
