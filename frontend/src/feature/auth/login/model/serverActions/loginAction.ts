"use server"

import { TokenManager } from "@share/packages/auth"
import { cookies } from "next/headers"
import { z } from "zod"
import { ZSAError, createServerAction } from "zsa"
import { login } from "../../api/login"
import { loginRequestSchema } from "../schema"

const loginResponseSchema = z.object({ authorized: z.literal(true) })

export const loginAction = createServerAction()
	.input(loginRequestSchema)
	.output(loginResponseSchema)
	.handler(async ({ input }) => {
		const resp = await login(input)

		switch (resp) {
			case login.errors.INPUT_VALIDATION_ERROR:
				throw new ZSAError("INPUT_PARSE_ERROR")
			case login.errors.INTERNAL_SERVER_ERROR:
				throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const clientCookies = cookies()

		TokenManager.setToken(clientCookies, resp.token)

		return { authorized: true }
	})
