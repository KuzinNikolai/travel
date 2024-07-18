"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { logger, SafeJson } from "@share/lib"
import { z } from "zod"
import { createServerAction, ZSAError } from "zsa"
import { responseSchema, verifyRequestSchema, type VerifyRequestServer } from "../consts/schema"

export const verifyAction = createServerAction()
	.input(verifyRequestSchema)
	.output(z.void())
	.handler(async ({ input: code }) => {
		try {
			const resp = await fetch(`${API_DOMAIN}/api/v1/verify-email/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: SafeJson.stringify({ email_verification_code: code } satisfies VerifyRequestServer),
			})

			const text = await resp.text()
			const json = SafeJson.parse(text)

			if (!json) {
				logger.fatal("[verificationAction]", text)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			const { success, data, error } = await responseSchema.safeParseAsync(json)

			if (!success) {
				logger.fatal("[verifyActionResponse]", error)
				throw new ZSAError("FORBIDDEN")
			}

			if ("error" in data) {
				throw new ZSAError("INPUT_PARSE_ERROR")
			}

			return
		} catch (err) {
			logger.fatal("[verifyActionCatch]", err)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
