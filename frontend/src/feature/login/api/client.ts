import { loginResponseSchema, type LoginRequest } from "@api/auth/login/_schema"
import { clientAxios } from "@share/api"
import { logger } from "@share/lib"

const clientLogin = async (body: LoginRequest) => {
	const { data } = await clientAxios.post("/auth/login", { body })

	const parsed = loginResponseSchema.safeParse(data)

	if (!parsed.success) {
		logger.fail(`[clientLogin] ${parsed.error.message}`)
		return { code: "INVALID_RESPONSE_BODY" }
	}

	return parsed.data
}

export { clientLogin }
