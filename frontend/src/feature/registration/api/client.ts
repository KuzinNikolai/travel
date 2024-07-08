import { registrationResponseSchema, type registrationRequestSchema } from "@api/auth/registration/_schema"
import { clientAxios } from "@share/api"
import { logger } from "@share/lib"
import type { z } from "zod"

export const clientRegistration = async (body: z.infer<typeof registrationRequestSchema>) => {
	const { data } = await clientAxios.post("/auth/registration/", body)

	const { success, data: parsed, error } = registrationResponseSchema.safeParse(data)

	if (!success) {
		logger.fail(`[clientRegistration] ${error.message}`)
		return
	}

	return parsed
}
