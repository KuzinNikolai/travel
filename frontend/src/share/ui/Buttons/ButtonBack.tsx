"use client"

import { useHistory } from "@share/lib"
import { IconButton } from "@share/ui"
import { useId, type FC, type HTMLAttributes } from "react"

export const ButtonBack: FC<HTMLAttributes<HTMLButtonElement>> = (props) => {
	const { back } = useHistory()
	const id = useId()

	return (
		<>
			<label
				className='sr-only'
				htmlFor={id}
			>
				Назад
			</label>
			<IconButton
				id={id}
				icon='ChevronLeft'
				className='-translate-x-3 text-secondary transition delay-100 hover:text-cyan-500'
				onClick={props.onClick || back}
			/>
		</>
	)
}
