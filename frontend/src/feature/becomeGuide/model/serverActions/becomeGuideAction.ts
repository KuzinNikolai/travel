"use server"

import { updateUser } from "@entity/user"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { isAuthorizedAction } from "@share/packages/auth"
import { fetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"
import { safe, safeApi } from "@share/packages/safeApi"
import { z } from "zod"
import { ZSAError } from "zsa"
import { becomeGuideSchema } from "../schema"
import { __DEV__ } from "@share/constants/environment"

const responseApiSchema = z.object({
	message: z.string(),
})

export const becomeGuideAction = isAuthorizedAction
	.createServerAction()
	.input(becomeGuideSchema)
	.output(z.object({ success: z.literal(true) }))
	.onInputParseError(({ errors }) => {
		if (__DEV__) {
			print.error("[BecomeGuided - onInputParseError]", errors)
		}
	})
	.onOutputParseError(({ errors }) => {
		if (__DEV__) {
			print.error("[BecomeGuided - onOutputParseError]", errors)
		}
	})
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

		const text = await safe(resp.text())

		if (!text.success) {
			print.fail("[BecomeGuided - parse text]", text.error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const json = safeApi.json.parse(text.data)

		if (!json) {
			print.fatal("[BecomeGuided - parse json]", text.data)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = responseApiSchema.safeParse(json)

		if (!success) {
			print.fail("[BecomeGuided - validate]", data, error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		return {
			success: true,
		}
	})
