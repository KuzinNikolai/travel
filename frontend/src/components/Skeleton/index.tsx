import clsx from "clsx"
import { type FC, type HTMLAttributes, forwardRef } from "react"

interface ICustomSkeletonProps extends HTMLAttributes<HTMLDivElement> {
	isBackgroundBlack?: boolean
	className?: string
}

export const Skeleton: FC<ICustomSkeletonProps> = forwardRef<HTMLDivElement, ICustomSkeletonProps>(
	({ isBackgroundBlack = false, className, ...props }, ref) => {
		return (
			<div
				className={clsx(
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
