"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { z } from "zod"
import { createServerAction, ZSAError } from "zsa"
import { responseSchema, verifyRequestSchema, type VerifyRequestServer } from "../consts/schema"
import { safeApi } from "@share/packages/safeApi"
import { fetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"

export const verifyAction = createServerAction()
	.input(verifyRequestSchema)
	.output(z.void())
	.handler(async ({ input: code }) => {
		const resp = await fetcher(`${API_DOMAIN}/api/v1/verify-email/`, {
			method: "POST",
			body: safeApi.json.stringify({ email_verification_code: code } satisfies VerifyRequestServer),
		})

		if (!resp) {
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		try {
			const text = await resp.text()
			const json = safeApi.json.parse(text)

			if (!json) {
				print.fatal("[verificationAction]", text)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			const { success, data, error } = await responseSchema.safeParseAsync(json)

			if (!success) {
				print.fatal("[verifyActionResponse]", error)
				throw new ZSAError("FORBIDDEN")
			}

			if ("error" in data) {
				throw new ZSAError("INPUT_PARSE_ERROR")
			}

			return
		} catch (err) {
			print.fatal("[verifyActionCatch]", err)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
