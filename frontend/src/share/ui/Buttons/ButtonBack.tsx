"use client"

import { IconButton } from "@share/ui/Buttons"
import Link from "next/link"
import { type ComponentPropsWithoutRef, useId, type FC } from "react"
import { Icon } from "../Icon"

export const ButtonBack: FC<Partial<ComponentPropsWithoutRef<typeof IconButton>>> = (props) => {
	const id = useId()

	return (
		<IconButton
			id={id}
			className='text-secondary transition delay-100 hover:text-cyan-500'
			{...props}
			icon='ChevronLeft'
			asChild
		>
			<Link href='.'>
				<Icon name='ChevronLeft' />
			</Link>
		</IconButton>
	)
}
