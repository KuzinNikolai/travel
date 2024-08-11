import { cn } from "@share/lib"
import { forwardRef, type FC, type HTMLAttributes } from "react"

interface ICustomSkeletonProps extends HTMLAttributes<HTMLDivElement> {
	isBackgroundBlack?: boolean
	className?: string
}

export const Skeleton: FC<ICustomSkeletonProps> = forwardRef<HTMLDivElement, ICustomSkeletonProps>(
	({ isBackgroundBlack = false, className, ...props }, ref) => {
		return (
			<div
				className={cn(
					"bg-gradient-to-r",
					isBackgroundBlack ? "from-base-120 to-base-140" : "from-base-40/20 to-base-60/20",
					"animate-pulse rounded",
					className,
				)}
				{...props}
				ref={ref}
			/>
		)
	},
)

Skeleton.displayName = "Skeleton"
