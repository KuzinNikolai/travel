import type { VerificationRequest } from "@api/auth/verify/_schema"
import { clientAxios } from "@share/api"
import { logger } from "@share/lib"
import { verificationResponseSchema } from "../consts/schema"

export const clientVerification = async (data: VerificationRequest) => {
	try {
		const res = await clientAxios.post("/auth/verify", data)

		const parsedSchema = verificationResponseSchema.safeParse(res.data)

		return parsedSchema.data
	} catch (e) {
		logger.error("clientVerification", e)
	}
}
