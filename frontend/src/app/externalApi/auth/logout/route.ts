import { API_DOMAIN, StatusCodes } from "@share/api"
import { tokenWithPrefixSchema } from "@share/constants/schemes"
import { SafeJson, logger } from "@share/lib"
import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import type { LogoutResponse } from "./_schema"

export async function POST(req: NextRequest): Promise<NextResponse<LogoutResponse>> {
	try {
		const token = req.headers.get("Authorization")

		if (!token) {
			return NextResponse.json({ code: "UNAUTHORIZED" }, { status: StatusCodes.FORBIDDEN })
		}

		const { success, data: parsedToken } = tokenWithPrefixSchema.safeParse(token)

		if (!success) {
			return NextResponse.json({ code: "INVALID_TOKEN" }, { status: StatusCodes.FORBIDDEN })
		}

		const res = await fetch(`${API_DOMAIN}/api/v1/auth/token/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: parsedToken,
			},
		})

		if (!res.ok) {
			const logoutText = await res.text()

			if (logoutText.length > 0) {
				const { success, data, error } = await z
					.object({ detail: z.string() })
					.safeParseAsync(SafeJson.parse(logoutText))

				if (!success) {
					logger.fail(error)
					return NextResponse.json(
						{ code: "INVALID_RESPONSE_BODY", error, success: false },
						{ status: StatusCodes.INTERNAL_SERVER_ERROR },
					)
				}

				return NextResponse.json(
					{ success: false, code: "LOGOUT", error: data.detail },
					{ status: StatusCodes.FORBIDDEN },
				)
			}
		}

		return NextResponse.json({ success: true }, { status: StatusCodes.OK })
	} catch (e) {
		logger.error(e)
		return NextResponse.json({ code: "SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}
