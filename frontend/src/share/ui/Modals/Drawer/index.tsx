"use client"

import type { FC, PropsWithChildren, ReactElement } from "react"
import { DrawerContent, DrawerRoot, DrawerTrigger } from "../DrawerBase"
import { Typography } from "@share/ui/Text"

interface IDrawerProps extends PropsWithChildren {
	title: string
	expand?: boolean
	trigger?: ReactElement
}

export const Drawer: FC<IDrawerProps> = ({ title, expand, trigger, children }) => {
	return (
		<DrawerRoot open={expand}>
			{trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
			<DrawerContent className='container'>
				<div>
					<div className='py-2 pt-4'>
						<Typography
							variant='h2'
							textWidth='medium'
							className='w-full'
						>
							{title}
						</Typography>
					</div>
					<div className='max-h-[80vh] max-w-full overflow-y-auto overflow-x-hidden pb-4'>{children}</div>
				</div>
			</DrawerContent>
		</DrawerRoot>
	)
}
