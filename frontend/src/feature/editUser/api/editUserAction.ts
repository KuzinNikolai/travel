"use server"

import { updateUser } from "@entity/user"
import { isAuthorizedAction } from "@share/packages/auth"
import { z } from "zod"
import { zu } from "zod_utilz"
import { ZSAError } from "zsa"
import { editUserSchema } from "../schema/editUser.schema"

export const editUserAction = isAuthorizedAction
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
