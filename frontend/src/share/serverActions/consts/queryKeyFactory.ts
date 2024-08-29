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
	countryList: () => ["countries", "list"],
	detailCountry: (countrySlug: string) => ["countries", countrySlug],

	cities: () => ["cities"],
	city: (id: number) => ["cities", id.toString()],
	cityList: () => ["cities", "list"],
	detailCity: (citySlug: string) => ["cities", citySlug],

	tours: () => ["tours"],
	detailTour: (tourSlug: string) => ["tours", tourSlug],
}

const user = {
	account: () => ["account"],
	clientData: (clientId: number) => [`clientInfo-${clientId}`],
}

const search = { search: (searchParam: string) => ["search", `search$${searchParam}`] }

const client = {
	clientOrders: () => ["clientOrders"],
	clientWishlist: () => ["clientWishlist"],
	clientHelpList: () => ["helpList"],
}

const review = {
	reviewListByTour: (tourId: number) => [`reviews-${tourId.toString()}`],
}

const supplier = {
	supplierOffers: () => ["guideOffers"],
	supplierProfile: (guideId: number) => ["guideProfile", guideId.toString()],
	supplierOrders: () => ["guideOrders"],
	supplierOrder: (orderId: number) => ["guideOrders", orderId.toString()],
}

export const queryKeyFactory = createServerActionsKeyFactory({
	...staticData,
	...travelData,
	...user,
	...search,
	...client,
	...review,
	...supplier,
} as const)
