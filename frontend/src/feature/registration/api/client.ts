import { registrationResponseSchema, type registrationRequestSchema } from "@api/auth/registration/_schema"
import { clientAxios } from "@share/api"
import { logger } from "@share/lib"
import type { z } from "zod"

export const clientRegistration = async (body: z.infer<typeof registrationRequestSchema>) => {
	const { data } = await clientAxios.post("/auth/registration", body)

	const parsed = registrationResponseSchema.safeParse(data)

	if (!parsed.success) {
		logger.fail(`[clientRegistration] ${parsed.error.message}`)
		return { code: "INVALID_RESPONSE_BODY" }
	}

	return parsed.data
}
