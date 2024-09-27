import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverFetcher } from "@share/packages/fetcher"
import { safeApi } from "@share/packages/safeApi"
import { tokenSchema } from "@share/schemas/share"
import { z } from "zod"
import type { LoginRequest } from "../model/schema"

const loginServerResponseSchema = z
	.object({ auth_token: tokenSchema })
	.or(z.object({ non_field_error: z.string().array() }))

enum LoginErrors {
	INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export async function login(input: LoginRequest) {
	const data = await serverFetcher({
		name: "login",
		url: `${API_DOMAIN}/api/v1/auth/token/login/`,
		method: "POST",
		responseSchema: loginServerResponseSchema,
		init: {
			body: safeApi.json.stringify(input),
		},
	})

	if ("code" in data) {
		return LoginErrors.INTERNAL_SERVER_ERROR
	}

	if ("non_field_error" in data) {
		return LoginErrors.INPUT_VALIDATION_ERROR
	}

	return { token: data.auth_token }
}

login.errors = LoginErrors
