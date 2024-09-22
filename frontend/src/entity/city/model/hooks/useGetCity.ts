"use client"

import { queryKeyFactory, useServerActionQuery } from "@share/packages/serverActions"
import { useState } from "react"
import { getCitiesByIdAction } from "../serverActions/getCityByIdAction"

export function useGetCity(cityId?: number) {
	const [city, setCity] = useState<number | null>(null)

	const query = useServerActionQuery(getCitiesByIdAction, {
		enabled: !!(cityId || city),
		queryKey: queryKeyFactory.city(cityId || city || 0),
		input: { id: city || 0 },
	})

	const fetchRun = (id: number) => setCity(id)

	return {
		query,
		fetchRun,
	}
}
