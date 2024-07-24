"use client"

import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionQuery } from "@share/serverActions/model"
import { useState } from "react"
import { getCountryByIdAction } from "../api/getCountryByIdAction"

export function useGetCountry(countryId?: number) {
	const [city, setCity] = useState<number | null>(null)

	const query = useServerActionQuery(getCountryByIdAction, {
		enabled: !!(countryId || city),
		queryKey: queryKeyFactory.city(countryId || city || 0),
		input: { id: city || 0 },
	})

	const fetchRun = (id: number) => setCity(id)

	return {
		query,
		fetchRun,
	}
}
