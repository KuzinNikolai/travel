"use server"

import { isAuthorized } from "@share/serverActions"
import { createOrderSchema } from "../../schemas/createOrder.schema"
import { createOrder } from "../../api/createOrder"
import { orderSchema } from "@entity/order"
import { logger, SafeJson } from "@share/lib"

export const createOrderAction = isAuthorized
	.createServerAction()
	.input(createOrderSchema)
	.handler(async ({ input }) => {
		const resp = await createOrder(input, input.token)

		if (!resp) {
			return
		}

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.error("[createOrderAction - response parse error]", resp)
			return
		}

		const { success, data, error } = await orderSchema.safeParseAsync(json)

		if (!success) {
			logger.error("[createOrderAction - response validation error]", resp, error)
			return
		}

		return data
	})
