"use client"

import { useServerActionQuery } from "@share/serverActions/model"
import { getCountriesAction } from "../api/getCountriesAction"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useGetCountries() {
	const query = useServerActionQuery(getCountriesAction, {
		queryKey: queryKeyFactory.cities(),
		input: undefined,
	})
	return query
}
