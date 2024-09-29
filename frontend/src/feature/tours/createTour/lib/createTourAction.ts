"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { isAuthorizedAction } from "@share/packages/auth"
import { serverFetch } from "@share/packages/fetcher/lib/serverFetch"
import { safeApi } from "@share/packages/safeApi"
import { tourSchema } from "@share/schemas"
import slugify from "slugify"
import { z } from "zod"
import { createTourSchema, type CreateTour } from "./domain"
import { ZSAError } from "zsa"
import { isErrorResponse } from "@share/packages/fetcher"

export const createTourActionInputSchema = createTourSchema.omit({
	type: true,
	user: true,
	country: true,
	city: true,
	photos: true,
	slug: true,
	duration: true,
})

export const createTourAction = isAuthorizedAction
	.createServerAction()
	.input(createTourActionInputSchema)
	.output(tourSchema)
	.handler(async ({ input, ctx }) => {
		const { user, token } = ctx

		if (user.country === null || user.city === null) {
			throw new ZSAError("INPUT_PARSE_ERROR", "Failed to create tour, required country and city")
		}

		const tourData: CreateTour = {
			type: 1,
			slug: slugify(input.title),
			country: user.country,
			city: user.city,
			duration: {
				day: 0,
				hour: 0,
			},
			user: ctx.user.id,
			photos: [],
			...input,
		}

		const tour = await serverFetch({
			name: "createTour",
			url: `${API_DOMAIN}/api/v1/tours/`,
			method: "POST",
			responseSchema: tourSchema,
			init: {
				body: safeApi.json.stringify(tourData),
				token,
			},
		})

		if (isErrorResponse(tour)) {
			throw new ZSAError("INTERNAL_SERVER_ERROR", "Failed to create tour")
		}

		return tour
	})
