"use client"

import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionQuery } from "@share/serverActions/model"
import { getCityListAction } from "../api/getCityListAction"

export function useGetCityList() {
	const query = useServerActionQuery(getCityListAction, {
		queryKey: queryKeyFactory.cityList(),
		input: undefined,
	})
	return query
}
