"use client";

import { ClientReview, useReviews } from "@entity/review";
import type { DetailTour } from "@entity/tour";
import { useLocale } from "@share/lib";
import { Button } from "@share/ui/Buttons";
import { Section } from "@share/ui/Layout";
import { Drawer } from "@share/ui/Modals";
import { Typography } from "@share/ui/Text";
import { StatisticReviews } from "@widget/Reviews/StatisticReviews";
import { useTranslations } from "next-intl";
import { type FC, useMemo } from "react";

interface PreviewReviewsProps {
	tour: Pick<DetailTour, "id" | "title" | "reviews">;
}

export const PreviewReviews: FC<PreviewReviewsProps> = ({ tour }) => {
	const t = useTranslations("pages.detailTour.reviews");
	const { currentLang } = useLocale();

	const { data: allReviews, isPaused: pendingAllReviews } = useReviews(tour.id);

	const previewReviews = useMemo(() => {
		if (!allReviews) return [];
		return allReviews
			.toSorted((current, next) =>
				current.created_date > next.created_date ? -1 : 0,
			)
			.slice(0, 3);
	}, [allReviews]);

	return (
		<Section
			title={t("title")}
			header={
				!pendingAllReviews && (allReviews?.length || 0) > 3 ? (
					<Drawer
						title={t("titleAllReviews")}
						trigger={
							<Button variant="outline">{t("actions.showAllReviews")}</Button>
						}
						contentProps={{
							className: "flex flex-1 flex-col gap-md",
						}}
					>
						<StatisticReviews id={tour.id} />
						<div className="flex max-h-full flex-col gap-sm overflow-y-auto">
							{allReviews?.map((review) => (
								<ClientReview
									key={review.id}
									review={{
										...review,
										text: (review.translations[currentLang || "en"] || review)
											.text,
									}}
								/>
							))}
						</div>
					</Drawer>
				) : null
			}
		>
			<div className="flex flex-col gap-sm">
				{previewReviews.length > 0 ? (
					previewReviews.map((review) => (
						<ClientReview
							key={review.id}
							review={{
								...review,
								text: (review.translations[currentLang || "en"] || review).text,
							}}
						/>
					))
				) : (
					<Typography>{t("emptyReviews")}</Typography>
				)}
			</div>
		</Section>
	);
};
