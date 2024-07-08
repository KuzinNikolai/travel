import { getCities } from "@entity/city"
import { getTours } from "@entity/tour"
import { StatusCodes } from "@share/api"
import { NextResponse, type NextRequest } from "next/server"
import type { SearchGroup, SearchItem, SearchResponse } from "./_schema"

export async function GET(req: NextRequest): Promise<NextResponse<SearchResponse>> {
	const query = req.nextUrl.searchParams.get("q")?.toLowerCase()

	const [cities, tours] = await Promise.all([getCities(), getTours()])
	const searchGroups = new Map<string, SearchGroup>()

	const setSearchItem = (searchItem: SearchItem) => {
		if (!searchGroups.has(searchItem.citySlug)) {
			searchGroups.set(searchItem.citySlug, {
				id: searchItem.citySlug,
				items: [],
			})
		}

		searchGroups.get(searchItem.citySlug)?.items.push(searchItem)
	}

	for (const city of cities || []) {
		if (!city.title.toLowerCase().includes(query || "")) continue
		setSearchItem({ title: city.title, citySlug: city.slug })
	}

	for (const tour of tours || []) {
		if (!tour.title.toLowerCase().includes(query || "")) continue
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
		{ status: StatusCodes.OK },
	)
}
