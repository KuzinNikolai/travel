import { serverFetchApi } from "@share/api"
import { tokenWithPrefixSchema } from "@share/constants/schemes"

export async function checkAuthorization(req: Request) {
	const authorizeToken = req.headers.get("Authorization")

	if (!authorizeToken) {
		return
	}

	const { success: isTokenValid, data: token } = tokenWithPrefixSchema.safeParse(authorizeToken)

	const user = await serverFetchApi("/auth/user/me", "GET", {
		headers: {
			Authorization: `Token ${token}`,
		},
	})

	if (!user.ok) {
		return
	}

	return isTokenValid ? token : undefined
}
