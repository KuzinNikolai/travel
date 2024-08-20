"use client";

import { cn, logger } from "@share/lib";
import { type ComponentProps, type FC, useEffect, useState } from "react";
import type { Icon } from "../../Icon";
import { RatingItem } from "./RatingItem";

interface InputRatingProps {
	rating: number;
	onBlur?: () => void;
	onChange?: (rating: number) => void;
	iconProps?: ComponentProps<typeof Icon>;
	ratingMax?: number;
}

export const InputRating: FC<InputRatingProps> = ({
	rating,
	ratingMax = 5,
	iconProps,
	onBlur,
	onChange,
}) => {
	const [hover, setHover] = useState(0);

	useEffect(() => {
		logger.debug("InputRating:", { rating, hover });
	}, [hover, rating]);

	return (
		<fieldset className="flex items-center">
			<legend className="sr-only absolute">
				Please select your preferred contact method:
			</legend>
			{[...Array(ratingMax)].map((_, i) => (
				<RatingItem
					currentPosition={rating}
					currentRating={i + 1}
					maxRating={ratingMax}
					key={i}
					containerProps={{
						onClick: () => {
							onChange?.(i + 1);
							onBlur?.();
						},
						onMouseEnter: () => setHover(i + 1),
						onMouseLeave: () => setHover(0),
					}}
					iconProps={{
						...iconProps,
						className: cn(
							"stroke-primary-90",
							i + 1 <= hover && "fill-primary-70",
							i + 1 === hover && "fill-primary-90",
							hover === 0 && i + 1 <= rating && "fill-primary-70",
							iconProps?.className,
						),
					}}
				/>
			))}
		</fieldset>
	);
};
