import { useSearchParams } from "@share/lib"
import { useMemo } from "react"
import { useGetSearch } from "../api/client"

export function useSearch() {
	const { getSearchParam } = useSearchParams<"q">()

	const searchParam = useMemo(() => getSearchParam("q"), [getSearchParam])

	const search = useGetSearch()

	const data = useMemo(() => {
		if (search.data === null || !Array.isArray(search.data)) {
			return []
		}

		if (searchParam === null || searchParam.length === 0) {
			return search.data
		}

		return search.data.map((searchGroup) => ({
			id: searchGroup.id,
			items: searchGroup.items.filter((item) => !item.tourSlug),
		}))
	}, [search.data, searchParam])

	return { data, search }
}
