"use client"

import { useServerActionQuery } from "@share/serverActions/model"
import { getCitiesAction } from "../api/getCitiesAction"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useGetCities() {
	const query = useServerActionQuery(getCitiesAction, {
		queryKey: queryKeyFactory.cities(),
		input: undefined,
	})
	return query
}
