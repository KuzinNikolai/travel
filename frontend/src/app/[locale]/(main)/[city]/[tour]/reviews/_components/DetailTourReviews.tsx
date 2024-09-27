import { getDetailTour } from "@entity/tour"
import { isErrorResponse } from "@share/packages/fetcher"
import { Divider } from "@share/ui/Divider"
import { Section } from "@share/ui/Layout"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { ReviewList } from "@widget/Reviews/ReviewsList"
import { StatisticReviews } from "@widget/Reviews/StatisticReviews"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import type { FC } from "react"

interface DetailTourReviewsProps {
	tourSlug: string
}

export const DetailTourReviews: FC<DetailTourReviewsProps> = async ({ tourSlug }) => {
	const t = await getTranslations()

	const tour = await getDetailTour(tourSlug)

	if (isErrorResponse(tour)) {
		notFound()
	}

	return (
		<>
			<HeaderWithBack title={tour.title} />
			<Section
				title={t("pages.detailTourReviews.title")}
				containerClassNames='flex h-full flex-1 flex-col'
			>
				<StatisticReviews id={tour.id} />
				<Divider />
				<ReviewList tourId={tour.id} />
			</Section>
		</>
	)
}
