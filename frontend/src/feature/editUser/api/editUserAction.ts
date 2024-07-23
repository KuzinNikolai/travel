"use server"

import { logger, SafeJson } from "@share/lib"
import { isAuthorized } from "@share/serverActions"
import { z } from "zod"
import { ZSAError } from "zsa"
import { editUserSchema } from "../schema/editUser.schema"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { userSchema } from "@entity/user"
import { zu } from "zod_utilz"

const serverResponseSchema = userSchema
	.or(z.object({ first_name: z.string().array() }))
	.or(z.object({ last_name: z.string().array() }))

export const editUserAction = isAuthorized
	.createServerAction()
	.input(z.object({ formData: zu.useFormData(editUserSchema) }))
	.output(z.void())
	.onInputParseError((e) => {
		logger.fatal("[editUserActionPars]", e)
	})
	.handler(async ({ input, ctx: { token } }) => {
		const formData = new FormData()

		for (const key in input.formData) {
			const value = input.formData[key as keyof typeof input.formData]

			if (!value) {
				continue
			}

			formData.append(key, value)
		}

		try {
			const resp = await fetch(`${API_DOMAIN}/api/v1/auth/users/me/`, {
				method: "PATCH",
				headers: { Authorization: `Token ${token}` },
				body: formData,
			})

			const text = await resp.text()
			const json = SafeJson.parse(text)

			if (!json) {
				logger.fatal("[editUserAction]", text)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			const { success, data, error } = await serverResponseSchema.safeParseAsync(json)

			if (!success) {
				logger.fatal("[editUserAction]", json, error)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			if ("first_name" in data && Array.isArray(data.first_name)) {
				logger.fail("[editUserActionFail]", json)
				throw new ZSAError("INPUT_PARSE_ERROR")
			}

			if ("last_name" in data && Array.isArray(data.last_name)) {
				logger.fail("[editUserActionFail]", json)
				throw new ZSAError("INPUT_PARSE_ERROR")
			}
		} catch (error) {
			logger.fatal("[editUserActionCatch]", error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
