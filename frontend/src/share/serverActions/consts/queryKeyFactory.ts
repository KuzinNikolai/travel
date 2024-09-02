"use client"

import { createServerActionsKeyFactory } from "zsa-react-query"

const staticData = {
	faq: () => ["faq"],
	contacts: () => ["contacts"],
	about: () => ["about"],
	detailAbout: () => ["about", "detailAbout"],
	tourCatagories: () => ["tourCategories"],
}

const share = {
	user: () => ["user"],

	countries: () => ["countries"],
	countryList: () => ["countries", "list"],
	detailCountry: (countrySlug: string) => ["countries", countrySlug],
	
	cities: () => ["cities"],
	city: (id: number) => ["cities", id.toString()],
	cityList: () => ["cities", "list"],
	detailCity: (citySlug: string) => ["cities", citySlug],
	
	tours: () => ["tours"],
	detailTour: (tourSlug: string) => ["tours", tourSlug],
	reviewListByTour: (tourId: number) => [`reviews-${tourId.toString()}`],

	search: (searchParam: string) => ["search", `search$${searchParam}`],
}

const client = {
	clientOrders: () => ["clientOrders"],
	clientWishlist: () => ["clientWishlist"],
	clientHelpList: () => ["helpList"],

	// TEMP
	clientData: (userId: number) => [`clientData-${userId}`],
}

const supplier = {
	supplierProfile: (guideId: number) => ["guideProfile", guideId.toString()],

	supplierTours: () => ["guideOffers"],

	supplierOrders: () => ["guideOrders"],
	supplierOrder: (orderId: number) => ["guideOrders", orderId.toString()],
}

export const queryKeyFactory = createServerActionsKeyFactory({
	...staticData,
	...share,
	...client,
	...supplier,
} as const)
