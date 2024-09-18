"use server"

import { isAuthorized } from "@share/packages/auth"
import { z } from "zod"
import { ZSAError } from "zsa"
import { logout } from "../../api/logout"

export const logoutAction = isAuthorized
	.createServerAction()
	.output(z.object({ success: z.literal(true) }))
	.handler(async ({ ctx }) => {
		const resp = await logout(ctx.token)

		switch (resp) {
			case logout.errors.NOT_AUTHORIZED:
				throw new ZSAError("NOT_AUTHORIZED")
			case logout.errors.FORBIDDEN:
				throw new ZSAError("FORBIDDEN")
			case logout.errors.INVALID_TOKEN:
				throw new ZSAError("INPUT_PARSE_ERROR")
			case logout.errors.PARSE_ERROR:
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			case logout.errors.VALIDATION_RESPONSE_ERROR:
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			case logout.errors.INTERNAL_SERVER_ERROR:
				throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		return resp
	})
