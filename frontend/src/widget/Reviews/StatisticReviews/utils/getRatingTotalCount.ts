import type { Review } from "@entity/review";

export function getRatingTotalCount(
	reviews: Review[],
	selectRating: number,
): number {
	if (reviews.length === 0) return 0;
	return reviews.reduce(
		(acc, { rating }) => (rating === selectRating ? acc + 1 : acc),
		0,
	);
}
