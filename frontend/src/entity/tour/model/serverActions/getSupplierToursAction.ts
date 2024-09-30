"use server"
import { getSupplierTours } from "@entity/tour/api/getSupplierTours"
import { isAuthorizedAction } from "@share/packages/auth"
import { isErrorResponse } from "@share/packages/fetcher"
import { supplierOffer } from "@share/schemas"
import { z } from "zod"
import { ZSAError } from "zsa"

export const getSupplierToursAction = isAuthorizedAction
	.createServerAction()
	.input(z.undefined())
	.output(supplierOffer.array())
	.handler(async ({ ctx }) => {
		const { user } = ctx

		if (!user.is_staff) {
			throw new ZSAError("FORBIDDEN", "You are not allowed to view this data")
		}

		const tours = await getSupplierTours()

		if (isErrorResponse(tours)) {
			throw new ZSAError("INTERNAL_SERVER_ERROR", "Failed to get supplier tours")
		}

		return tours
	})
