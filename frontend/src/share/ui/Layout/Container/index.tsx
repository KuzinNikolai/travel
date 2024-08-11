import { cn } from "@share/lib"
import type { FC, HTMLAttributes, PropsWithChildren } from "react"

export const Container: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
	return (
		<div
			{...props}
			className={cn("mx-auto max-w-[1200px] p-sm", className)}
		>
			{children}
		</div>
	)
}
