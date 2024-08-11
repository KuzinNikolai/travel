"use client"

import type { FC, PropsWithChildren, ReactElement } from "react"
import { DrawerContent, DrawerRoot, DrawerTrigger } from "../Base"
import { Typography } from "@share/ui/Text"

interface DrawerProps extends PropsWithChildren {
	title: string
	expand?: boolean
	trigger?: ReactElement
}

export const Drawer: FC<DrawerProps> = ({ title, expand, trigger, children }) => {
	return (
		<DrawerRoot open={expand}>
			{trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
			<DrawerContent className='container'>
				<div>
					<div className='py-sm pt-md'>
						<Typography
							variant='h3'
							textWidth='medium'
							className='w-full'
						>
							{title}
						</Typography>
					</div>
					<div className='max-h-[80vh] max-w-full overflow-y-auto overflow-x-hidden pb-sm'>{children}</div>
				</div>
			</DrawerContent>
		</DrawerRoot>
	)
}
