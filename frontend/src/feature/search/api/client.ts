import { clientAxios } from "@share/api"
import { Time, useSearchParams } from "@share/lib"
import { useMemo } from "react"
import { useQuery } from "react-query"
import { searchGroupSchema } from "../consts/search.schema"

export const getSearch = async (query: string | null) => {
	const response = await clientAxios.get(query ? `/search?q=${query}` : "/search")
	const successResponse = searchGroupSchema.array().safeParse(response.data)

	if (successResponse.success) {
		return successResponse.data
	}

	return []
}

export const useGetSearch = () => {
	const { getSearchParam } = useSearchParams<"q">()

	const searchParam = useMemo(() => getSearchParam("q"), [getSearchParam])

	const search = useQuery(["search", searchParam], () => getSearch(searchParam), {
		refetchOnWindowFocus: false,
		keepPreviousData: true,
		cacheTime: Time.toMs("2m"),
		placeholderData: null,
	})

	return search
}
