"use server"

import { updateUser } from "@entity/user"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { isAuthorizedAction } from "@share/packages/auth"
import { fetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"
import { safeApi } from "@share/packages/safeApi"
import { z } from "zod"
import { ZSAError } from "zsa"
import { becomeGuideSchema } from "../consts/becomeGuide.schema"

const responseSchema = z.void()

export const becomeGuideAction = isAuthorizedAction
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

		const resp = await fetcher(`${API_DOMAIN}/api/v1/become-guide/`, {
			method: "POST",
			body: safeApi.json.stringify(input),
			token,
		})

		if (!resp) {
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		try {
			const text = await resp.text()

			const json = safeApi.json.parse(text)

			if (!json) {
				print.fatal("[BecomeGuided ParseResponse]", text)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			const { success, data, error } = responseSchema.safeParse(json)

			if (!success) {
				print.fail("[BecomeGuided SchemaParseResponse]", data, error)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}
		} catch (err) {
			print.fatal("[BecomeGuided Catch]", err)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
