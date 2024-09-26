"use client"

import { cn } from "@share/packages/tailwindHelpers"
import { Typography } from "@share/ui/Text"
import type { FC, HTMLAttributes, PropsWithChildren, ReactElement } from "react"
import { DrawerContent, DrawerRoot, DrawerTrigger } from "../Base"

interface DrawerProps extends PropsWithChildren {
	title: string
	expand?: boolean
	trigger?: ReactElement
	contentProps?: HTMLAttributes<HTMLElement>
}

export const Drawer: FC<DrawerProps> = ({ title, expand, trigger, contentProps, children }) => {
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
					<div
						{...contentProps}
						className={cn("max-h-[80vh] max-w-full overflow-y-auto overflow-x-hidden pb-sm", contentProps?.className)}
					>
						{children}
					</div>
				</div>
			</DrawerContent>
		</DrawerRoot>
	)
}
