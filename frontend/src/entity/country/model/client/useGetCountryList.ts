"use client"

import { queryKeyFactory, useServerActionQuery } from "@share/packages/serverActions"
import { getCountryListAction } from "../serverActions/getCountryList"

export function useGetCountryList() {
	return useServerActionQuery(getCountryListAction, {
		queryKey: queryKeyFactory.countryList(),
		input: undefined,
	})
}
