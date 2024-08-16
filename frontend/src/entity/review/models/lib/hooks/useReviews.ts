import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionQuery } from "@share/serverActions/model"
import { getAllTourReviews } from "../serverActions/getAllTourReviews"

export function useReviews(tourId: number) {
	const query = useServerActionQuery(getAllTourReviews, {
		input: { tourId },
		queryKey: queryKeyFactory.reviewListByTour(tourId),
	})

	return query
}
