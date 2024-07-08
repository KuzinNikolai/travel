import { StatusCodes } from "@share/api"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body = req.nextUrl.searchParams

		return NextResponse.json({})
	} catch (error) {
		return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}
