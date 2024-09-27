import { userSchema } from "@share/schemas"
import { z } from "zod"

export const editUserSchema = userSchema
	.pick({
		first_name: true,
		last_name: true,
	})
	.extend({
		photo: z.instanceof(File).refine((file) => /image\/(jpeg|png|webp|avif)/.test(file.type), {
			message: "INVALID_FILE_TYPE",
			path: ["photo"],
		}),
	})
	.partial()

export type EditUser = z.infer<typeof editUserSchema>
