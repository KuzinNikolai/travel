import { verificationResponseSchema, type VerificationRequest } from "@api/auth/verify/_schema"
import { clientAxios } from "@share/api"
import { logger } from "@share/lib"

export const clientVerification = async (data: VerificationRequest) => {
	try {
		const res = await clientAxios.post("/auth/verify", data)

		const parsedSchema = verificationResponseSchema.safeParse(res.data)

		if (!parsedSchema.success) {
			logger.error("clientVerification", parsedSchema.error)
			return
		}

		return parsedSchema.data
	} catch (e) {
		logger.error("clientVerification", e)
	}
}
