"use client"

import { IconButton } from "@share/ui/Buttons"
import { useRouter } from "next/navigation"
import { useId, type ButtonHTMLAttributes, type FC, type HTMLAttributes } from "react"

export const ButtonBack: FC<HTMLAttributes<HTMLButtonElement>> = (props) => {
	const router = useRouter()
	const id = useId()

	const onBack: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] = (e) => {
		props.onClick?.(e)
		router.push(".", { scroll: false })
	}

	return (
		<>
			<label
				className='sr-only'
				htmlFor={id}
			>
				Назад
			</label>
			<IconButton
				{...props}
				id={id}
				icon='ChevronLeft'
				className='-translate-x-3 text-secondary transition delay-100 hover:text-cyan-500'
				onClick={onBack}
			/>
		</>
	)
}
