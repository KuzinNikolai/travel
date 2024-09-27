import type { Tour } from "@share/schemas"
import type { PagesProps } from "@share/types"
import { DetailTourReviews } from "./_components/DetailTourReviews"

export const dynamic = "force-dynamic"

export default function TourReviewsPage({ params }: PagesProps<{ tour: Tour["slug"] }>) {
	return <DetailTourReviews tourSlug={params.tour} />
}
