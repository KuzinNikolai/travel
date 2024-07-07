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
					isBackgroundBlack ? "from-gray-400 to-gray-300" : "from-gray-400/20 to-gray-400/20",
					"animate-pulse rounded duration-[2s]",
					className,
				)}
				{...props}
				ref={ref}
			/>
		)
	},
)

Skeleton.displayName = "Skeleton"
