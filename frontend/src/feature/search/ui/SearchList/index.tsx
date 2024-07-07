import { useSearch } from "@feature/search/model/useSearch"
import { Icon, Typography } from "@share/ui"
import { SearchGroup } from "../SearchGroup"
import { SearchItem } from "../SearchItem"

export const SearchList = () => {
	const { data, search } = useSearch()

	if (search.isFetching || search.isLoading) {
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
