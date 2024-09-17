"use client";

import { ReviewItem, useReviews } from "@entity/review";
import type { Tour } from "@entity/tour";
import { List } from "@share/ui/List";
import { Typography } from "@share/ui/Text";
import { useTranslations } from "next-intl";
import { type FC, useMemo } from "react";
import { ReviewsSkeleton } from "./ReviewsSkeleton";

interface ReviewListProps {
	tourId: Tour["id"];
}

export const ReviewList: FC<ReviewListProps> = ({ tourId }) => {
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
