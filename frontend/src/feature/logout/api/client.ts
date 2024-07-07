import { logoutResponseSchema } from "@api/auth/logout/_schema"
import { clientAxiosWithToken } from "@share/api"
import { logger } from "@share/lib"

const clientLogout = async () => {
	const { data } = await clientAxiosWithToken.post("/auth/logout")

	const parsed = logoutResponseSchema.safeParse(data)

	if (!parsed.success) {
		logger.fail(`[clientLogout] ${parsed.error.message}`)
		return { code: "INVALID_RESPONSE_BODY" }
	}

	return parsed.data
}

export { clientLogout }
