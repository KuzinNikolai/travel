import { serverRegistration } from "@/packages/API/fetches/auth/server"
import { BadStatusCodes, SuccessStatusCodes } from "@/packages/utils/api-utils"
import { logger } from "@/packages/utils/logger"
import {
	registrationErrorResponseSCheme,
	registrationRequestSchema,
	registrationSuccessResponseSchema,
} from "@packages/schemes/auth/registration/server.schema"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { success: reqSuccess, data: reqData } = registrationRequestSchema.safeParse(body)

		if (!reqSuccess) {
			return NextResponse.json({ code: "INVALID_BODY" }, { status: BadStatusCodes.BAD_REQUEST })
		}

		const res = await serverRegistration(reqData)

		const registerText = await res.json()

		const {
			success: parseSuccess,
			data,
			error,
		} = registrationSuccessResponseSchema.or(registrationErrorResponseSCheme).safeParse(registerText)

		if (!parseSuccess) {
			logger.warn("Invalid Response Error", error)
			return NextResponse.json(
				{ code: "INVALID_RESPONSE_BODY", error },
				{ status: BadStatusCodes.INTERNAL_SERVER_ERROR },
			)
		}

		if (Array.isArray(data.email)) {
			return NextResponse.json({ success: false, code: "USER_ALREADY_EXISTS" }, { status: BadStatusCodes.FORBIDDEN })
		}

		return NextResponse.json({ success: true }, { status: SuccessStatusCodes.CREATED })
	} catch (e) {
		logger.error("Registration Critical Error", e)
		return NextResponse.json({ code: "SERVER_ERROR" }, { status: BadStatusCodes.INTERNAL_SERVER_ERROR })
	}
}
