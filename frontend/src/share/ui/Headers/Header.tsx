import type { FC } from "react"
import { BaseHeader } from "./BaseHeader"
import { ButtonBack } from "../Buttons"
import { Typography } from "../Text"

interface HeaderProps {
	title: React.ReactNode
	action?: React.ReactNode
}

export const Header: FC<HeaderProps> = ({ title, action }) => {
	return (
		<BaseHeader
			leftColumn={<ButtonBack />}
			centerColumn={
				<Typography
					variant='h4'
					as='h1'
					textAlign='center'
				>
					{title}
				</Typography>
			}
			rightColumn={action}
		/>
	)
}
