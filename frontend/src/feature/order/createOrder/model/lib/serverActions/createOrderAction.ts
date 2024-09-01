"use server"

import { isAuthorized } from "@share/serverActions"
import { createOrderSchema } from "../../schemas/createOrder.schema"
import { createOrder } from "../../api/createOrder"
import { orderSchema } from "@entity/order"
import { logger, SafeJson } from "@share/lib"
import { ZSAError } from "zsa"

export const createOrderAction = isAuthorized
	.createServerAction()
	.input(createOrderSchema)
	.handler(async ({ input, ctx }) => {
		const resp = await createOrder(input, ctx.token)

		if (!resp) {
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.error("[createOrderAction - response parse error]", resp)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = await orderSchema.safeParseAsync(json)

		if (!success) {
			logger.error("[createOrderAction - response validation error]", resp, error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		return data
	})
