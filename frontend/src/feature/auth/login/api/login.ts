import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { logger, safeFetch, SafeJson } from "@share/lib"
import { z } from "zod"
import { tokenSchema } from "@share/constants/schemes"
import { userSchema } from "@entity/user"

export const loginRequestSchema = userSchema.pick({ email: true }).extend({ password: z.string().min(6) })
type LoginRequest = z.infer<typeof loginRequestSchema>

const loginServerResponseSchema = z
	.object({ auth_token: tokenSchema })
	.or(z.object({ non_field_error: z.string().array() }))

enum LoginErrors {
	INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
	PARSE_ERROR = "PARSE_ERROR",
	VALIDATION_ERROR = "VALIDATION_ERROR",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export async function login(input: LoginRequest) {
	const resp = await safeFetch(`${API_DOMAIN}/api/v1/auth/token/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: SafeJson.stringify(input),
	})

	if (!resp) {
		return LoginErrors.INTERNAL_SERVER_ERROR
	}

	const text = await resp.text()
	const json = SafeJson.parse(text)

	if (!json) {
		logger.fatal("[loginAction]", text)
		return LoginErrors.PARSE_ERROR
	}

	const { success, data, error } = await loginServerResponseSchema.safeParseAsync(json)

	if (!success) {
		logger.debug("[loginActionParseResponse]", json, error)
		return LoginErrors.VALIDATION_ERROR
	}

	if ("non_field_error" in data) {
		return LoginErrors.INPUT_VALIDATION_ERROR
	}

	return { token: data.auth_token }
}

login.errors = LoginErrors
