import { ReviewItem } from "@entity/review"
import { List } from "@share/ui/List"

export const ReviewsSkeleton = () => (
	<List
		orientation='horizontal'
		showDivider
	>
		{new Array(3).map((_, i) => (
			<ReviewItem.Skeleton key={i} />
		))}
	</List>
)
