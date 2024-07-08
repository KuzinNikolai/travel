import { cn } from "@share/lib"
import type { FC, HTMLAttributes, PropsWithChildren } from "react"

interface IContainerProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
	fixed?: boolean
}

export const Container: FC<IContainerProps> = ({ fixed = true, className, children, ...props }) => {
	return (
		<div
			{...props}
			className={cn(className, fixed && "container")}
		>
			{children}
		</div>
	)
}
