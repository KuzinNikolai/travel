import type { Order } from "@entity/order"
import { API_DOMAIN, StatusCodes } from "@share/api"
import { checkAuthorization } from "@share/api/lib/checkAuthorization"
import { logger } from "@share/lib"
import { NextResponse, type NextRequest } from "next/server"
import * as GET_Schema from "./_schema/GET"
import * as POST_Schema from "./_schema/POST"
import { isRequiredFieldsError } from "./_utils"
import formatDate from "date-fns"

export async function GET(req: NextRequest): Promise<NextResponse<GET_Schema.OrderResponse>> {
	try {
		const auth = await checkAuthorization(req)

		if (!auth) {
			return NextResponse.json({ code: "UNAUTHORIZED" }, { status: StatusCodes.FORBIDDEN })
		}

		const res = await fetch(`${API_DOMAIN}/api/v1/my_orders`, {
			method: "GET",
			headers: { Authorization: auth.token },
			next: { revalidate: 10 },
		})

		const orderJson = await res.json()

		const { success, data, error } = GET_Schema.orderServerResponseSchema.safeParse(orderJson)

		if (!success) {
			logger.fail("[GET ORDERS] Invalid response", error)
			return NextResponse.json({ code: "SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
		}

		if ("detail" in data) {
			return NextResponse.json({
				code: "UNAUTHORIZED",
				message: data.detail,
			})
		}

		return NextResponse.json(data, { status: StatusCodes.OK })
	} catch (error) {
		logger.fail("[GET ORDERS] Invalid response", error)
		return NextResponse.json({ code: "SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}

export async function POST(req: NextRequest): Promise<NextResponse<POST_Schema.CreateOrderResponse>> {
	try {
		const auth = await checkAuthorization(req)

		if (!auth) {
			return NextResponse.json({ code: "UNAUTHORIZED" }, { status: StatusCodes.FORBIDDEN })
		}

		const body = await req.json()

		const { success: reqSuccess, data: reqData, error: reqError } = POST_Schema.createOrderRequestSchema.safeParse(body)

		if (!reqSuccess) {
			logger.fail("[createOrder]", reqError)
			return NextResponse.json({ code: "INVALID_BODY" }, { status: StatusCodes.BAD_REQUEST })
		}

		const requestBody = Object.assign({}, reqData, {
			email: auth.user.email,
			user: auth.user.id,
		}) satisfies POST_Schema.CreateOrderServerRequest

		const orderRes = await fetch(`${API_DOMAIN}/api/v1/orders/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth.token,
			},
			body: JSON.stringify(requestBody),
		})

		const orderResJson = await orderRes.json()

		const { success, data, error } = POST_Schema.createOrderServerResponseSchema.safeParse(orderResJson)

		if (!success) {
			logger.fail("[createOrder]", error)
			return NextResponse.json({ code: "SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
		}

		if ("detail" in data) {
			return NextResponse.json({ code: "UNAUTHORIZED" }, { status: StatusCodes.FORBIDDEN })
		}

		if (isRequiredFieldsError(data)) {
			return NextResponse.json({ code: "INVALID_BODY" }, { status: StatusCodes.BAD_REQUEST })
		}

		return NextResponse.json(data as Order, { status: StatusCodes.CREATED })
	} catch (error) {
		logger.fail("[createOrder]", error)
		return NextResponse.json({ code: "SERVER_ERROR" }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}
