import { ButtonBack, Header, Typography } from "@share/ui"
import { forwardRef } from "react"

interface IBackHeaderProps {
	title?: string
	onBack?: () => void
}

export const HeaderWithBack = forwardRef<HTMLElement, IBackHeaderProps>(({ title, onBack }, ref) => {
	return (
		<Header
			ref={ref}
			leftColumn={<ButtonBack onClick={onBack} />}
			centerColumn={
				<Typography
					variant='content1'
					textWidth='bold'
					textAlign='center'
					as='h1'
				>
					{title}
				</Typography>
			}
		/>
	)
})

HeaderWithBack.displayName = "Header with back button"
