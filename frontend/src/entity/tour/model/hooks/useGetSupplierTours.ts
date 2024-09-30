"use client"

import { useServerActionQuery } from "@share/packages/serverActions"
import { getSupplierToursAction } from "../serverActions/getSupplierToursAction"

export const useGetSupplierTours = () => {
	return useServerActionQuery(getSupplierToursAction, {
		input: undefined,
		queryKey: ["getSupplierTours"],
	})
}
