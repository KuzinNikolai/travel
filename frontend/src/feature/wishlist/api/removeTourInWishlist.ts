"use severer"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { logger, SafeJson } from "@share/lib"
import { isAuthorized } from "@share/serverActions"
import { z } from "zod"
import { ZSAError } from "zsa"

const addTourInWishlistRequestSchema = z.object({ tourId: z.number() })
const addTourInWishlistResponseSchema = z.object({ success: z.literal(true) })

const serverAddTourResponseSchema = z
	.object({
		wishlist_id: z.number(),
		tour_id: z.number(),
	})
	.or(z.object({ detail: z.string() }))

interface AddTourInWishlistResponse {
	user: number
	tour_id: number
}

export const addTourInWishlistAction = isAuthorized
	.createServerAction()
	.input(addTourInWishlistRequestSchema)
	.output(addTourInWishlistResponseSchema)
	.handler(async ({ input, ctx }) => {
		const { user } = ctx
		const { tourId } = input

		const resp = await fetch(`${API_DOMAIN}/api/v1/remove_wishlist/${tourId}`, {
			method: "DELETE",
			body: SafeJson.stringify({ user: user.id, tour_id: tourId } satisfies AddTourInWishlistResponse),
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[AddTourInWishlist]", text)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = await serverAddTourResponseSchema.safeParseAsync(json)

		if (!success) {
			logger.fatal("[AddTourInWishlistResponse]", error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
		
		if ("detail" in data) {
			throw new ZSAError("INPUT_PARSE_ERROR")
		}

		return {
			success: true,
		}
	})
