"use client"

import { createServerActionsKeyFactory } from "zsa-react-query"

const staticData = {
	faq: () => ["faq"],
	contacts: () => ["contacts"],
	about: () => ["about"],
	detailAbout: () => ["about", "detailAbout"],
	tourCatagories: () => ["tourCategories"],
}

const travelData = {
	countries: () => ["countries"],
	detailCountry: (countrySlug: string) => ["countries", countrySlug],

	cities: () => ["cities"],
	detailCity: (citySlug: string) => ["cities", citySlug],

	tours: () => ["tours"],
	detailTour: (tourSlug: string) => ["tours", tourSlug],
}

const user = { account: () => ["account"] }

const search = { search: (searchParam: string) => ["search", `search$${searchParam}`] }

const client = {
	clientOrders: () => ["clientOrders"],
	clientWishlist: () => ["clientWishlist"],
	clientHelpList: () => ["helpList"],
}

const guide = {
	guideOffers: () => ["guideOffers"],
	guideProfile: (guideId: number) => ["guideProfile", guideId.toString()],
	guideOrders: () => ["guideOrders"],
}

export const queryKeyFactory = createServerActionsKeyFactory({
	...staticData,
	...travelData,
	...user,
	...search,
	...client,
	...guide,
} as const)