import { cn } from "@share/packages/tailwindHelpers";
import type { ComponentProps, FC } from "react";
import { Icon } from "../Icon";

interface RatingProps extends ComponentProps<typeof Icon> {
	rating: number;
}

export const Rating: FC<RatingProps> = ({
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
						"h-5 w-5 stroke-[2px] stroke-trinity-gold",
						index < Math.round(rating) ? "fill-trinity-gold" : "fill-none",
						props.className,
					)}
				/>
			))}
		</div>
	);
};
