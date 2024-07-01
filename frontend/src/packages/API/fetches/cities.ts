import { cityItemSchema, detailCitySchema } from "@/packages/schemes/travel/city.schema"
import { z } from "zod"
import { fetchApi } from "../serverApi"

export const getCities = async () =>
	await fetchApi("/cities", "GET", {
		schema: z.array(cityItemSchema),
		next: { revalidate: 120 },
	})

export const getCity = async (citySlug: string) => (await getCities())?.filter((item) => item.slug === citySlug)?.[0]

export const getDetailCity = async (citySlug: string) =>
	await fetchApi(`/city/${citySlug}`, "GET", {
		schema: detailCitySchema,
		next: { revalidate: 120 },
	})
