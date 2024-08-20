import { cn } from "@share/lib";
import type { ComponentProps, FC } from "react";
import { Icon } from "../Icon";
import { RatingSkeleton } from "./RatingSkeleton";

interface RatingProps extends ComponentProps<typeof Icon> {
	rating: number;
}

export const Rating: FC<RatingProps> & { Skeleton: typeof RatingSkeleton } = ({
	rating,
	...props
}) => {
	return (
		<div className="flex items-center gap-1">
			{new Array(5).fill(0).map((_, index) => (
				<Icon
					{...props}
					key={index}
					name="Star"
					aria-hidden
					className={cn(
						"h-5 w-5 stroke-[2px] stroke-primary-90",
						index < Math.round(rating) ? "fill-primary-90" : "fill-none",
						props.className,
					)}
				/>
			))}
		</div>
	);
};

Rating.Skeleton = RatingSkeleton;
