"use server"

import { isAuthorizedAction } from "@share/packages/auth"
import { print } from "@share/packages/logger"
import { safe, safeApi } from "@share/packages/safeApi"
import { orderSchema } from "@share/schemas"
import { ZSAError } from "zsa"
import { createOrder } from "../../api/createOrder"
import { createOrderSchema } from "../../schemas/createOrder.schema"

export const createOrderAction = isAuthorizedAction
	.createServerAction()
	.input(createOrderSchema)
	.handler(async ({ input, ctx }) => {
		const resp = await createOrder(input, ctx.token)

		if (!resp) {
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const parseText = await safe(resp.text())

		if (!parseText.success) {
			print.error("[createOrderAction - response parse error]", resp)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const json = safeApi.json.parse(parseText.data)

		if (!json) {
			print.error("[createOrderAction - parse json error]", parseText.data)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = await orderSchema.safeParseAsync(json)

		if (!success) {
			print.error("[createOrderAction - response validation error]", safeApi.json.stringify(json, undefined, 2), error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		return data
	})
