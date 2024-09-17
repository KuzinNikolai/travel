"use client";

import { cn } from "@share/packages/tailwindHelpers";
import { useTranslations } from "next-intl";
import {
	type ComponentProps,
	type FC,
	type HTMLAttributes,
	useId,
} from "react";
import { Icon } from "../../Icon";

interface RatingItemProps {
	currentRating: number;
	currentPosition: number;
	maxRating: number;
	onChange?: (rating: number) => void;
	containerProps?: HTMLAttributes<HTMLElement>;
	iconProps?: ComponentProps<typeof Icon>;
}

export const RatingItem: FC<RatingItemProps> = ({
	currentRating,
	currentPosition,
	maxRating,
	containerProps,
	iconProps,
	onChange,
}) => {
	const t = useTranslations();
	const id = useId();

	return (
		<div {...containerProps} className={cn("p-sm", containerProps?.className)}>
			<label htmlFor={id} className="sr-only absolute">
				{t("components.rating.label", {
					rating: currentRating,
					ratingMax: maxRating,
				})}
			</label>
			<input
				id={id}
				type="radio"
				name="rating"
				className="sr-only absolute [&+svg]:focus-visible:stroke-2 [&+svg]:focus-visible:stroke-trinity-gold"
				onChange={() => onChange?.(currentPosition)}
				checked={currentPosition === currentRating}
			/>
			<Icon
				key={currentRating}
				name="Star"
				{...iconProps}
				aria-hidden
				className={cn(
					"h-10 w-10 stroke-[1px] transition-all",
					iconProps?.className,
				)}
			/>
		</div>
	);
};
