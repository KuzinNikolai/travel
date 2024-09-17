import type { cookies } from "next/headers"

export async function getToken(clientCookies: ReturnType<typeof cookies>): Promise<string | undefined> {
	const authorization = clientCookies.get("Authorization")

	if (!authorization) {
		return
	}

	const [, token] = authorization.value.split(" ")

	return token
}
