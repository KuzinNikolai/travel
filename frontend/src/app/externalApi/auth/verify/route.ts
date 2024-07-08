import { API_DOMAIN, StatusCodes } from "@share/api"
import { SafeJson, logger } from "@share/lib"
import { NextResponse, type NextRequest } from "next/server"
import {
	verificationRequestSchema,
	verificationServerResponseErrorSchema,
	verificationServerResponseSchema,
	type VerificationResponse,
	type VerificationServerRequest,
} from "./_schema"

export async function POST(req: NextRequest): Promise<NextResponse<VerificationResponse>> {
	try {
		const body = await req.json()

		const { success: reqSuccess, data: reqData, error: reqError } = verificationRequestSchema.safeParse(body)

		if (!reqSuccess) {
			return NextResponse.json({ code: "INVALID_BODY", error: reqError }, { status: StatusCodes.BAD_REQUEST })
		}

		const response = await fetch(`${API_DOMAIN}/api/v1/verify-email/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: SafeJson.stringify({ email_verification_code: reqData.code } satisfies VerificationServerRequest),
		})

		const verifyResponseJson = await response.json()

		const { success, data, error } = verificationServerResponseSchema
			.or(verificationServerResponseErrorSchema)
			.safeParse(verifyResponseJson)

		if (!success) {
			return NextResponse.json({ code: "INVALID_RESPONSE_BODY", error }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
		}

		if ("error" in data) {
			return NextResponse.json(
				{ code: "INVALID_CODE", error: data.error },
				{ status: StatusCodes.INTERNAL_SERVER_ERROR },
			)
		}

		return NextResponse.json({ success: true }, { status: StatusCodes.OK })
	} catch (e) {
		logger.error(e)
		return NextResponse.json({ code: "SERVER_ERROR", success: false }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}
