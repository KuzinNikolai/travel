"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { logger, SafeJson } from "@share/lib"
import { isAuthorized } from "@share/serverActions"
import { becomeGuideSchema } from "../consts/becomeGuide.schema"
import { z } from "zod"
import { ZSAError } from "zsa"
import { updateUser } from "@entity/user"

const responseSchema = z.void()

export const becomeGuideAction = isAuthorized
	.createServerAction()
	.input(becomeGuideSchema)
	.output(z.void())
	.handler(async ({ input, ctx }) => {
		const { user, token } = ctx

		if (user.is_staff) {
			throw new ZSAError("ERROR", "ALREADY_GUIDER")
		}

		const userEditResp = await updateUser(input, token)

		switch (userEditResp) {
			case "INPUT_PARSE_ERROR":
				throw new ZSAError("INPUT_PARSE_ERROR")
			case "INTERNAL_SERVER_ERROR":
				throw new ZSAError("INPUT_PARSE_ERROR")
		}

		const resp = await fetch(`${API_DOMAIN}/api/v1/become-guide/`, {
			method: "POST",
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
			body: SafeJson.stringify(input),
		})

		const text = await resp.text()

		if (resp.ok) {
			return
		}

		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[BecomeGuided ParseResponse]", text)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = responseSchema.safeParse(json)

		if (!success) {
			logger.fail("[BecomeGuided SchemaParseResponse]", data, error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
