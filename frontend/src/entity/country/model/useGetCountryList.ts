"use client"

import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionQuery } from "@share/serverActions/model"
import { getCountryListAction } from "../api/getCountryList"

export function useGetCountryList() {
	const query = useServerActionQuery(getCountryListAction, {
		queryKey: queryKeyFactory.countryList(),
		input: undefined,
	})
	return query
}
