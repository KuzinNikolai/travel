"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { isAuthorizedAction } from "@share/packages/auth"
import { isErrorResponse } from "@share/packages/fetcher"
import { serverFetch } from "@share/packages/fetcher/lib/serverFetch"
import { print } from "@share/packages/logger"
import { tourSchema } from "@share/schemas"
import { getLocale } from "next-intl/server"
import { serialize } from "object-to-formdata"
import slugify from "slugify"
import zu from "zod_utilz"
import { ZSAError } from "zsa"
import { type EditTour, editTourSchema } from "./domain"

export const editTourActionInputSchema = editTourSchema.omit({ slug: true, user: true })

export const editTourAction = isAuthorizedAction
	.createServerAction()
	.input(zu.useFormData(editTourActionInputSchema))
	.output(tourSchema)
	.handler(async ({ input, ctx }) => {
		const { user, token } = ctx
		const locale = await getLocale()

		const tourData: EditTour = {
			slug: slugify(input.title),
			user: user.id,
			...input,
		}

		const formData = serialize(tourData, {
			indices: true,
			booleansAsIntegers: true,
			allowEmptyArrays: true,
			dotsForObjectNotation: true,
			noAttributesWithArrayNotation: true,
			noFilesWithArrayNotation: true,
		})


		print.debug(formData)

		const tour = await serverFetch({
			name: "createTour",
			url: `${API_DOMAIN}/${locale}/api/v1/tours/`,
			method: "POST",
			responseSchema: tourSchema,
			init: {
				body: formData,
				token,
			},
		})

		if (isErrorResponse(tour)) {
			throw new ZSAError("INTERNAL_SERVER_ERROR", "Failed to edit tour")
		}

		return tour
	})
