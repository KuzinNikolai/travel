"use server"

import { getUsers } from "@entity/user/api/getUsers"
import { isAuthorized } from "@share/packages/auth"
import { userSchema } from "@share/schemas"
import { z } from "zod"

export const getUserByIdAction = isAuthorized
	.createServerAction()
	.input(userSchema.pick({ id: true }))
	.output(userSchema.or(z.null()))
	.handler(async ({ input, ctx }) => {
		const users = await getUsers(ctx.token)

		if ("code" in users) {
			return null
		}

		return users.find(({ id }) => id === input.id) || null
	})
