import { createOrderSchema, formCreateOrderSchema, orderSchema } from "@entity/order"
import { clientErrorResponseSchema, serverErrorResponseSchema } from "@share/api"
import { z } from "zod"

// CLIENT

export const createOrderRequestSchema = formCreateOrderSchema

export const createOrderErrorCodesSchema = z.enum(["UNAUTHORIZED", "INVALID_BODY", "SERVER_ERROR"])

export const createOrderResponseSchema = orderSchema.or(clientErrorResponseSchema(createOrderErrorCodesSchema))

export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>
export type CreateOrderErrorCodes = z.infer<typeof createOrderErrorCodesSchema>
export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>

// API

export const createOrderServerRequestSchema = createOrderSchema

const requiredFieldKeys = orderSchema
	.pick({
		full_name: true,
		user: true,
		email: true,
		phone: true,
		program: true,
		trip_date: true,
	})
	.keyof().Enum
export type RequiredFieldKeys = (typeof requiredFieldKeys)[keyof typeof requiredFieldKeys]

export const requiredFieldsErrorResponseSchemaByKey = z.object(
	Object.entries(requiredFieldKeys).reduce(
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		(acc, [key]) => ((acc[key as RequiredFieldKeys] = z.array(z.string())), acc),
		{} as Record<RequiredFieldKeys, z.ZodArray<z.ZodString>>,
	),
)

export const createOrderServerErrorResponseSchema = serverErrorResponseSchema.or(requiredFieldsErrorResponseSchemaByKey)

export const createOrderServerResponseSchema = orderSchema.or(createOrderServerErrorResponseSchema)

export type CreateOrderServerRequest = z.infer<typeof createOrderServerRequestSchema>
export type CreateOrderServerResponse = z.infer<typeof createOrderServerResponseSchema>
export type RequiredFieldsErrorResponseByKey = z.infer<typeof requiredFieldsErrorResponseSchemaByKey>
export type CreateOrderServerErrorResponse = z.infer<typeof createOrderServerErrorResponseSchema>
