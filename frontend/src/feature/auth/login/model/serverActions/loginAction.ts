"use server"

import { cookies } from "next/headers"
import { z } from "zod"
import { createServerAction, ZSAError } from "zsa"
import { login, loginRequestSchema } from "../../api/login"

const loginResponseSchema = z.object({ authorized: z.literal(true) })

export const loginAction = createServerAction()
	.input(loginRequestSchema)
	.output(loginResponseSchema)
	.handler(async ({ input }) => {
		const resp = await login(input)

		switch (resp) {
			case login.errors.INPUT_VALIDATION_ERROR:
				throw new ZSAError("INPUT_PARSE_ERROR")
			case login.errors.PARSE_ERROR:
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			case login.errors.VALIDATION_ERROR:
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			case login.errors.INTERNAL_SERVER_ERROR:
				throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const clientCookies = cookies()
		clientCookies.set("Authorization", `Token ${resp.token}`)

		return { authorized: true }
	})
