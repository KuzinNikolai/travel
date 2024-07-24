import { Container } from "@share/ui/Layout"
import clsx from "clsx"
import { type ReactNode, forwardRef } from "react"

interface IHeaderProps {
	leftColumn?: ReactNode | ReactNode[]
	centerColumn?: ReactNode | ReactNode[]
	rightColumn?: ReactNode | ReactNode[]
	backgroundColor?: string
}

export const BaseHeader = forwardRef<HTMLElement, IHeaderProps>(
	({ leftColumn, centerColumn, rightColumn, ...props }, ref) => {
		return (
			<header
				ref={ref}
				className={clsx(
					"sticky top-0 right-0 left-0 z-10",
					props.backgroundColor || "bg-white/70",
					"backdrop-blur-3xl",
				)}
			>
				<Container className={clsx("py-2", "grid grid-cols-[0.5fr_1fr_0.5fr] items-center justify-between gap-2")}>
					<div className={clsx("", "flex items-center justify-start gap-2")}>{leftColumn}</div>
					<div className={clsx("", "flex items-center justify-center gap-2")}>{centerColumn}</div>
					<div className={clsx("", "flex items-center justify-end gap-2")}>{rightColumn}</div>
				</Container>
			</header>
		)
	},
)

BaseHeader.displayName = "Header Base"
