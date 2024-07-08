import { API_DOMAIN, StatusCodes } from "@share/api"
import { checkAuthorization } from "@share/api/lib/checkAuthorization"
import { logger } from "@share/lib"
import { NextResponse, type NextRequest } from "next/server"
import { userServerResponseSchema, type UserResponse } from "./_schema"

export async function GET(req: NextRequest): Promise<NextResponse<UserResponse>> {
	try {
		const token = await checkAuthorization(req)

		if (typeof token !== "string") {
			return NextResponse.json({ code: "INVALID_TOKEN" }, { status: StatusCodes.FORBIDDEN })
		}

		const res = await fetch(`${API_DOMAIN}/api/v1/auth/users/me`, {
			method: "GET",
			headers: { Authorization: token },
			next: { revalidate: 10 },
		})

		const userJson = await res.json()

		const { success, data, error } = userServerResponseSchema.safeParse(userJson)

		if (!success) {
			logger.error("Invalid response", error)
			return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
		}

		if ("detail" in data) {
			return NextResponse.json({
				code: "UNAUTHORIZED",
				message: data.detail,
			})
		}

		return NextResponse.json(data, { status: StatusCodes.OK })
	} catch (error) {
		logger.error("Get User Critical Error:", error)
		return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}
