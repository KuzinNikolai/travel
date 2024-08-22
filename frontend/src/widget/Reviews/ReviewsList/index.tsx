"use client";

import { type Review, ReviewItem, useReviews } from "@entity/review";
import type { Tour } from "@entity/tour";
import { logger } from "@share/lib";
import { RatingItem } from "@share/ui/Inputs/InputRating/RatingItem";
import { List } from "@share/ui/List";
import { Typography } from "@share/ui/Text";
import { useTranslations } from "next-intl";
import { type FC, useEffect, useMemo } from "react";
import { ReviewsSkeleton } from "./ReviewsSkeleton";

interface ReviewListProps {
	tourId: Tour["id"];
	reviews?: Review[];
}

export const ReviewList: FC<ReviewListProps> = ({ tourId, reviews }) => {
	const t = useTranslations("components.reviews");
	const tourReviews = useReviews(tourId);

	const sortedTourReviews = useMemo(() => {
		return (tourReviews.data || []).sort((curr, next) =>
			curr.created_date > next.created_date ? -1 : 0,
		);
	}, [tourReviews.data]);

	return !tourReviews.isPending ? (
		(tourReviews.data?.length || 0) > 0 ? (
			<List orientation="vertical" showDivider>
				{sortedTourReviews.map((review) => (
					<ReviewItem key={review.id} review={review} />
				))}
			</List>
		) : (
			<Typography>{t("emptyReviews")}</Typography>
		)
	) : (
		<ReviewsSkeleton />
	);
};
