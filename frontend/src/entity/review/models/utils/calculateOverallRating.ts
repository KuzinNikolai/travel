export function calculateOverallRating(reviews: number[]) {
	if (reviews.length === 0) return 0
	const totalScore = reviews.reduce((acc, review) => acc + review)
	return totalScore / reviews.length
}
