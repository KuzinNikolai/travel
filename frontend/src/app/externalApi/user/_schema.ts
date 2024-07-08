import { userSchema } from "@entity/user/consts/user.schema"
import { clientErrorResponseSchema, serverErrorResponseSchema } from "@share/api"
import { z } from "zod"

// Client

const codes = z.enum(["UNAUTHORIZED", "INVALID_TOKEN", "INTERNAL_SERVER_ERROR"])

export const userResponseSchema = userSchema.or(clientErrorResponseSchema(codes))

export type UserResponse = z.infer<typeof userResponseSchema>

// API

export const userServerResponseSchema = userSchema.or(serverErrorResponseSchema)
