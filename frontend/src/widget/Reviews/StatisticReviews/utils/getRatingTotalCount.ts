import type { Review } from "@share/schemas"

export function getRatingTotalCount(reviews: Review[], selectRating: number): number {
	if (reviews.length === 0) return 0
	return reviews.reduce((acc, { rating }) => (rating === selectRating ? acc + 1 : acc), 0)
}
