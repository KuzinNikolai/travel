import type { cookies } from "next/headers"

type NextCookies = ReturnType<typeof cookies>

const cookieName = "Authorization"

export class TokenManager {
	#cookies: NextCookies

	constructor(cookies: NextCookies) {
		this.#cookies = cookies
	}

	get token() {
		const cookie = this.#cookies.get(cookieName)?.value

		const [type, token] = cookie ? cookie.split(" ") : [undefined, undefined]

		return {
			type,
			token,
		}
	}

	setToken(token: string, type = "Token") {
		this.#cookies.set(cookieName, `${type} ${token}`)
	}

	deleteToken() {
		this.#cookies.delete(cookieName)
	}

	static getToken(cookies: NextCookies) {
		return new TokenManager(cookies).token
	}

	static setToken(cookies: NextCookies, token: string, type = "Token") {
		cookies.set(cookieName, `${type} ${token}`)
	}

	static deleteToken(cookies: NextCookies) {
		cookies.delete(cookieName)
	}
}
