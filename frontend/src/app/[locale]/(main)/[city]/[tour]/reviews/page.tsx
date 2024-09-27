import { getDetailTour } from "@entity/tour"
import { isErrorResponse } from "@share/packages/fetcher"
import type { Tour } from "@share/schemas"
import type { PagesProps } from "@share/types"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { DetailTourReviews } from "./_components/DetailTourReviews"

export const dynamic = "force-dynamic"

export default function TourReviewsPage({ params }: PagesProps<{ tour: Tour["slug"] }>) {
	return <DetailTourReviews tourSlug={params.tour} />
}

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
	const t = await getTranslations()

	const tour = await getDetailTour(params.tour)

	return {
		title: t("pages.detailTourReviews.meta.title", { tourName: isErrorResponse(tour) ? "" : tour.title }),
		robots: {
			index: false,
			follow: false,
		},
	}
}
