import { createOrderSchema, orderSchema } from "@entity/order"
import { clientErrorResponseSchema, serverErrorResponseSchema } from "@share/api"
import { z } from "zod"

// CLIENT

export const orderErrorCodesSchema = z.enum(["UNAUTHORIZED", "SERVER_ERROR"])

export const orderResponseSchema = orderSchema.array().or(clientErrorResponseSchema(orderErrorCodesSchema))

export type OrderErrorCodes = z.infer<typeof orderErrorCodesSchema>
export type OrderResponse = z.infer<typeof orderResponseSchema>

// API

export const orderServerErrorResponseSchema = serverErrorResponseSchema

export const orderServerResponseSchema = orderSchema.array().or(orderServerErrorResponseSchema)

export type OrderServerResponse = z.infer<typeof orderServerResponseSchema>
export type OrderServerErrorResponse = z.infer<typeof orderServerErrorResponseSchema>
