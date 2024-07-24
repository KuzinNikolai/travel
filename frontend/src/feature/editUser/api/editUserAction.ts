"use server"

import { logger, SafeJson } from "@share/lib"
import { isAuthorized } from "@share/serverActions"
import { z } from "zod"
import { ZSAError } from "zsa"
import { editUserSchema } from "../schema/editUser.schema"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { updateUser, userSchema } from "@entity/user"
import { zu } from "zod_utilz"

const serverResponseSchema = userSchema
	.or(z.object({ first_name: z.string().array() }))
	.or(z.object({ last_name: z.string().array() }))

export const editUserAction = isAuthorized
	.createServerAction()
	.input(z.object({ formData: zu.useFormData(editUserSchema) }))
	.output(z.void())
	.handler(async ({ input, ctx: { token } }) => {
		const formData = new FormData()

		for (const key in input.formData) {
			const value = input.formData[key as keyof typeof input.formData]

			if (!value) {
				continue
			}

			formData.append(key, value)
		}

		const resp = await updateUser(formData, token)

		switch (resp) {
			case "INPUT_PARSE_ERROR":
				throw new ZSAError("INPUT_PARSE_ERROR")
			case "INTERNAL_SERVER_ERROR":
				throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
