import type { Tour } from "@entity/tour"
import type { PagesProps } from "@share/types"
import { DetailTourReviews } from "./_components/DetailTourReviews"

export default function TourReviewsPage({ params }: PagesProps<{ tour: Tour["slug"] }>) {
	return <DetailTourReviews tourSlug={params.tour} />
}
