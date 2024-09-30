"use client"

import { useGetSupplierTours } from "./useGetSupplierTours"

export const useGetSupplierTour = (tourSlug: number) => {
	const getSupplierToursMutation = useGetSupplierTours()

	const offer = getSupplierToursMutation.data?.find((tour) => tour.id === tourSlug)

	return { offer, getSupplierToursMutation }
}
