import { API_DOMAIN, StatusCodes, serverErrorResponseSchema } from "@share/api"
import { SafeJson, logger } from "@share/lib"
import { NextResponse, type NextRequest } from "next/server"
import {
	registrationRequestSchema,
	registrationServerErrorResponseSCheme,
	registrationServerResponseSchema,
	type RegistrationResponse,
} from "./_schema"

export async function POST(req: NextRequest): Promise<NextResponse<RegistrationResponse>> {
	try {
		const body = await req.json()
		const { success: reqSuccess, data: reqData } = registrationRequestSchema.safeParse(body)

		if (!reqSuccess) {
			return NextResponse.json({ code: "INVALID_BODY" }, { status: StatusCodes.BAD_REQUEST })
		}

		const res = await fetch(`${API_DOMAIN}/api/v1/register/`, {
			method: "POST",
			body: SafeJson.stringify(reqData),
			headers: { "Content-Type": "application/json" },
		})

		const registrationText = await res.json()

		const { success, data, error } = registrationServerResponseSchema
			.or(registrationServerErrorResponseSCheme)
			.or(serverErrorResponseSchema)
			.safeParse(registrationText)

		if (!success) {
			return NextResponse.json({ code: "INVALID_RESPONSE_BODY", error }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
		}

		if ("email" in data && Array.isArray(data.email)) {
			return NextResponse.json({ code: "USER_ALREADY_EXISTS" }, { status: StatusCodes.FORBIDDEN })
		}

		if (!res.ok) {
			return NextResponse.json({ code: "INVALID_RESPONSE_BODY", error }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
		}

		return NextResponse.json({ success: true }, { status: StatusCodes.CREATED })
	} catch (e) {
		logger.fatal("Registration Critical Error", e)
		return NextResponse.json({ code: "SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}
