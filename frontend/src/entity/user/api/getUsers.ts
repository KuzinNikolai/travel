import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverFetcher } from "@share/packages/fetcher"
import { userSchema } from "@share/schemas"

export async function getUsers(token: string) {
	return await serverFetcher({
		name: "GetUsers",
		url: `${API_DOMAIN}/api/v1/auth/users/`,
		method: "GET",
		responseSchema: userSchema.array(),
		init: { token },
		errorReturn: [],
	})
}
