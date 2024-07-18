import { useSearch } from "@feature/searchTour/model/useSearch"
import { SearchGroup } from "../SearchGroup"
import { SearchItem } from "../SearchItem"
import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"

export const SearchList = () => {
	const { data, query } = useSearch()

	if (query.isFetching || query.isPending) {
		return (
			<ul className='flex list-none flex-col gap-2'>
				{Array.from({ length: 10 }, (_, index) => (
					<SearchItem.Skeleton key={index} />
				))}
			</ul>
		)
	}

	return data.length > 0 ? (
		<ul className='flex list-none flex-col gap-2'>
			{data.map((group) => (
				<SearchGroup
					key={group.id}
					id={group.id}
				>
					{group.items.map((item) => (
						<SearchItem
							key={item.tourSlug}
							{...item}
						/>
					))}
				</SearchGroup>
			))}
		</ul>
	) : (
		<div className='flex gap-2'>
			<Icon name='LocateOff' />
			<Typography
				variant='h3'
				as='p'
			>
				Ничего не найдено
			</Typography>
		</div>
	)
}
