import { API_DOMAIN, StatusCodes } from "@share/api"
import { SafeJson, logger } from "@share/lib"
import { NextResponse, type NextRequest } from "next/server"
import {
	invalidServerLoginErrorSchema,
	loginRequestSchema,
	loginServerResponseSchema,
	type LoginResponse,
} from "./_schema"

export async function POST(req: NextRequest): Promise<NextResponse<LoginResponse>> {
	try {
		const body = await req.json()

		const { success: reqSuccess, data: reqData, error: reqError } = loginRequestSchema.safeParse(body)

		if (!reqSuccess) {
			return NextResponse.json({ code: "INVALID_BODY", error: reqError }, { status: StatusCodes.BAD_REQUEST })
		}

		const loginResponse = await fetch(`${API_DOMAIN}/api/v1/auth/token/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: SafeJson.stringify(reqData),
		})

		const loginJson = await loginResponse.json()

		const { success, data, error } = await loginServerResponseSchema
			.or(invalidServerLoginErrorSchema)
			.safeParseAsync(loginJson)

		if (!success) {
			return NextResponse.json({ code: "INVALID_RESPONSE_BODY", error }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
		}

		if ("non_field_errors" in data) {
			return NextResponse.json({ code: "INVALID_CREDENTIALS" }, { status: StatusCodes.BAD_REQUEST })
		}

		return NextResponse.json({ token: data.auth_token }, { status: StatusCodes.ACCEPTED })
	} catch (e) {
		logger.error("Login Error", e)
		return NextResponse.json({ code: "SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}
