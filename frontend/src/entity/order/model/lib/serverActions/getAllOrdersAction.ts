"use server"

import { isAuthorized } from "@share/serverActions"
import { orderSchema } from "../../schemas/order.schema"
import { getAllOrders } from "../../api/getAllOrders"
import { logger, SafeJson } from "@share/lib"
import { ZSAError } from "zsa"
import { serverErrorResponseSchema } from "@share/constants/schemes"

export const getAllOrdersAction = isAuthorized
	.createServerAction()
	.output(orderSchema.array())
	.handler(async ({ ctx }) => {
		const orders = await getAllOrders(ctx.token)

		if (!orders) {
			return []
		}
		
		const text = await orders.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fail("getAllOrdersAction - parse", text)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = await orderSchema.array().or(serverErrorResponseSchema).safeParseAsync(json)

		if (!success) {
			logger.fail("getAllOrdersAction - validation", text, error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		if ("detail" in data) {
			logger.fail("getAllOrdersAction - API error", data)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		return data
	})
