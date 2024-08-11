import { IconButton } from "@share/ui/Buttons"
import Link from "next/link"
import type { ComponentPropsWithoutRef, FC } from "react"

export const ButtonBack: FC<Partial<ComponentPropsWithoutRef<typeof IconButton>>> = (props) => {
	return (
		<IconButton
			icon='ChevronLeft'
			description='Back'
			{...props}
			asChild
		>
			<Link
				href='.'
				className='absolute top-0 right-0 bottom-0 left-0'
			/>
		</IconButton>
	)
}
