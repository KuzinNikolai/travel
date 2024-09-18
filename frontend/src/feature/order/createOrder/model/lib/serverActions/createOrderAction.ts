"use server"

import { orderSchema } from "@entity/order"
import { isAuthorized } from "@share/packages/auth"
import { print } from "@share/packages/logger"
import { safeApi } from "@share/packages/safeApi"
import { ZSAError } from "zsa"
import { createOrder } from "../../api/createOrder"
import { createOrderSchema } from "../../schemas/createOrder.schema"

export const createOrderAction = isAuthorized
	.createServerAction()
	.input(createOrderSchema)
	.handler(async ({ input, ctx }) => {
		const resp = await createOrder(input, ctx.token)

		if (!resp) {
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const text = await resp.text()
		const json = safeApi.json.parse(text)

		if (!json) {
			print.error("[createOrderAction - response parse error]", resp)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = await orderSchema.safeParseAsync(json)

		if (!success) {
			print.error("[createOrderAction - response validation error]", resp, error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		return data
	})
