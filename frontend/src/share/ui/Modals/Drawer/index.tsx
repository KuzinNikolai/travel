"use client"

import { DrawerContent, DrawerRoot, DrawerTrigger, Typography } from "@share/ui"
import type { FC, PropsWithChildren, ReactElement } from "react"

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
				<div className='pb-4'>
					<div className='py-2 pt-4'>
						<Typography
							variant='h2'
							textWidth='medium'
							className='w-full'
						>
							{title}
						</Typography>
					</div>
					<div className='max-h-[80vh] max-w-full overflow-y-auto overflow-x-hidden'>{children}</div>
				</div>
			</DrawerContent>
		</DrawerRoot>
	)
}
