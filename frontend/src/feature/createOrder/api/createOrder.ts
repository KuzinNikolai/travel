import { createOrderResponseSchema } from "@api/orders/_schema/POST"
import type { FormCreateOrder } from "@entity/order/consts/schema"
import { clientAxiosWithToken } from "@share/api"

export const createOrder = async (order: FormCreateOrder) => {
	const { data } = await clientAxiosWithToken.post("/orders", order)

	const { success, data: parsed } = createOrderResponseSchema.safeParse(data)

	if (!success) {
		return
	}

	return parsed
}
