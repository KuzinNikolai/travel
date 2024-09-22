"use client"

import { queryKeyFactory, useServerActionQuery } from "@share/packages/serverActions"
import { getCityListAction } from "../serverActions/getCityListAction"

export function useGetCityList() {
	return useServerActionQuery(getCityListAction, {
		queryKey: queryKeyFactory.cityList(),
		input: undefined,
	})
}
