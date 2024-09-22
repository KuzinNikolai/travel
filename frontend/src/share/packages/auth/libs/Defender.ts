import { getUser } from "@entity/user"
import type { cookies } from "next/headers"
import { TokenManager } from "./TokenManager"

type NextCookies = ReturnType<typeof cookies>

export class Defender {
	#tokenManager: TokenManager
	#token: string | undefined

	constructor(cookies: NextCookies) {
		this.#tokenManager = new TokenManager(cookies)
	}

	get userToken() {
		return this.#getToken()
	}

	async getUser() {
		return await this.#getUser()
	}

	async isAuthorized() {
		return !!(await this.#getUser())
	}

	async isStaff(): Promise<boolean> {
		const user = await this.#getUser()

		if (!user) return false

		return user.user.is_staff
	}

	async #getUser() {
		const token = this.#getToken()

		if (!token) return

		const resp = await getUser(token)

		if (typeof resp === "string") return

		return resp
	}

	#getToken() {
		if (this.#token) return this.#token

		const { token } = this.#tokenManager.token || {}

		this.#token = token

		return token
	}
}
