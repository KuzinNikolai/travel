"use server"

import { getPopularCities } from "@entity/city"
import { getTours } from "@entity/tour"
import { z } from "zod"
import { createServerAction } from "zsa"
import { searchGroupSchema, type TSearchGroup, type TSearchItem } from "../consts/search.schema"

const searchRequest = z.string()
const searchResponse = searchGroupSchema.array()

export const searchAction = createServerAction()
	.input(searchRequest)
	.output(searchResponse)
	.handler(async ({ input: query }) => {
		const [cities, tours] = await Promise.all([getPopularCities(), getTours()])
		const searchGroups = new Map<string, TSearchGroup>()

		const setSearchItem = (searchItem: TSearchItem) => {
			if (!searchGroups.has(searchItem.citySlug)) {
				searchGroups.set(searchItem.citySlug, {
					id: searchItem.citySlug,
					items: [],
				})
			}

			searchGroups.get(searchItem.citySlug)?.items.push(searchItem)
		}

		for (const city of Array.isArray(cities) ? cities : []) {
			if (!city.title.toLowerCase().includes(query.toLowerCase() || "")) continue
			setSearchItem({ title: city.title, citySlug: city.slug })
		}

		for (const tour of Array.isArray(tours) ? tours : []) {
			if (!tour.title.toLowerCase().includes(query.toLowerCase() || "")) continue
			setSearchItem({
				title: tour.title,
				citySlug: tour.city_slug,
				tourSlug: tour.slug,
			})
		}

		return Array.from(searchGroups.entries()).map(([_, group]) => {
			group.items.sort((searchItem) => (searchItem.tourSlug ? 0 : -1))
			return group
		})
	})
