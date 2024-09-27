import { useSearchParams } from "@share/packages/reactHelpers"
import { queryKeyFactory, useServerActionQuery } from "@share/packages/serverActions"
import { useMemo } from "react"
import { searchAction } from "../api/searchAction"

export function useSearch() {
	const { getSearchParam } = useSearchParams<"q">()

	const searchParam = useMemo(() => getSearchParam("q") || "", [getSearchParam])

	const query = useServerActionQuery(searchAction, {
		input: searchParam,
		queryKey: queryKeyFactory.search(searchParam.toLowerCase()),
	})

	const data = useMemo(() => {
		if (!query.data) {
			return []
		}

		if (searchParam.length === 0) {
			return query.data.map((searchGroup) => ({
				id: searchGroup.id,
				items: searchGroup.items.filter((item) => !item.tourSlug),
			}))
		}

		return query.data
	}, [query.data, searchParam])

	return { data, query }
}
