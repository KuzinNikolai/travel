import { useServerActionQuery, queryKeyFactory } from "@share/packages/serverActions"
import { getAllTourReviews } from "../serverActions/getAllTourReviews"

export function useReviews(tourId: number) {
	return useServerActionQuery(getAllTourReviews, {
		input: { tourId },
		queryKey: queryKeyFactory.reviewListByTour(tourId),
	})
}
