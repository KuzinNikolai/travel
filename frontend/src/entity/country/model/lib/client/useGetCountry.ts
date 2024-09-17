"use client"

import { queryKeyFactory, useServerActionQuery } from "@share/packages/serverActions"
import { useState } from "react"
import { getCountryByIdAction } from "../serverActions/getCountryByIdAction"

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
