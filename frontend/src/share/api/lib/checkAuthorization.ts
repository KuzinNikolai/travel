import { userSchema, type User } from "@entity/user"
import { serverFetchApiWithToken } from "@share/api"
import { tokenWithPrefixSchema } from "@share/constants/schemes"
import { logger } from "@share/lib";

export async function checkAuthorization(req: Request): Promise<{ user: User; token: string } | undefined> {
	const authorizeToken = req.headers.get("Authorization")

	if (!authorizeToken) {
		return
	}

	const { success: isTokenValid, data: token } = tokenWithPrefixSchema.safeParse(authorizeToken)

	if (!isTokenValid) {
		return
	}

	const user = await serverFetchApiWithToken("auth/users/me", "GET", token, {
		schema: userSchema,
		next: { revalidate: 10 },
	})

	if (!user.ok) {
		return
	}

	if (!user.schemaParsed) {
		return
	}

	return {
		user: user.data,
		token,
	}
}
