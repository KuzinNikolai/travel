import type { Tour } from "@entity/tour"
import { DetailTourReviews } from "@pages/DetailTourReviews"
import type { PagesProps } from "@share/lib"

export default function TourReviewsPage({ params }: PagesProps<{ tour: Tour["slug"] }>) {
	return <DetailTourReviews tourSlug={params.tour} />
}
