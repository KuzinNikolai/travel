import { Container } from "@/components/layout/Container"
import clsx from "clsx"
import { type ReactNode, forwardRef } from "react"

interface IHeaderProps {
	leftColumn?: ReactNode | ReactNode[]
	centerColumn?: ReactNode | ReactNode[]
	rightColumn?: ReactNode | ReactNode[]
	backgroundColor?: string
}

export const Header = forwardRef<HTMLElement, IHeaderProps>(
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
				<Container className={clsx("py-2", "flex items-center justify-between gap-2")}>
					<div className={clsx("flex-1", "flex items-center justify-start gap-2")}>{leftColumn}</div>
					<div className={clsx("flex-1", "flex items-center justify-center gap-2")}>{centerColumn}</div>
					<div className={clsx("flex-1", "flex items-center justify-end gap-2")}>{rightColumn}</div>
				</Container>
			</header>
		)
	},
)

Header.displayName = "Header Base"
