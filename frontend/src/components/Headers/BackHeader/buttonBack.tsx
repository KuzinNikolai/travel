"use client"

import { Button } from "@/components/Button"
import { useHistory } from "@/packages/hooks/useHistory"
import type { FC, HTMLAttributes } from "react"

export const ButtonBack: FC<HTMLAttributes<HTMLButtonElement>> = (props) => {
	const { back } = useHistory()

	return (
		<Button
			className='-translate-x-3 text-secondary transition delay-100 hover:text-cyan-500'
			leftIcon='ChevronLeft'
			{...props}
			onClick={props.onClick || back}
		>
			Назад
		</Button>
	)
}
