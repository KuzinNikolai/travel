import type { ISearchGroup, ISearchItem } from "@/entities/search.entity"
import { getCities } from "@/packages/API/fetches/cities"
import { getTours } from "@/packages/API/fetches/tours"
import { SuccessStatusCodes } from "@/packages/utils/api-utils"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get("q")?.toLowerCase()

	const [cities, tours] = await Promise.all([getCities(), getTours()])
	const searchGroups = new Map<string, ISearchGroup>()

	const setSearchItem = (searchItem: ISearchItem) => {
		if (!searchGroups.has(searchItem.citySlug)) {
			searchGroups.set(searchItem.citySlug, {
				id: searchItem.citySlug,
				items: [],
			})
		}

		searchGroups.get(searchItem.citySlug)?.items.push(searchItem)
	}

	for (const city of cities || []) {
		if (!city.title.toLowerCase().includes(query || "")) return
		setSearchItem({ title: city.title, citySlug: city.slug })
	}

	for (const tour of tours || []) {
		if (!tour.title.toLowerCase().includes(query || "")) return
		setSearchItem({
			title: tour.title,
			citySlug: tour.city_slug,
			tourSlug: tour.slug,
		})
	}

	return NextResponse.json(
		Array.from(searchGroups.entries()).map(([_, group]) => {
			group.items.sort((searchItem) => (searchItem.tourSlug ? 0 : -1))

			return group
		}),
		{ status: SuccessStatusCodes.OK },
	)
}
