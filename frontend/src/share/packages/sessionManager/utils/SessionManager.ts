import type { User } from "@entity/user"
import { Memo } from "@share/packages/memo"

type TempSessionId = `${User["id"]}-${string}`

class SessionManager {
	#sessions = new Memo<Session>()

	addSession(data: SessionData) {
		const session = new Session(data)
		this.#sessions.set(`${data.user.id}-${data.token}`, session)
		return session
	}

	getSession(sessionId: TempSessionId) {
		return this.#sessions.get(sessionId)
	}

	deleteSession(sessionId: TempSessionId) {
		this.#sessions.delete(sessionId)
	}

	clear() {
		this.#sessions.clear()
	}
}

interface SessionData {
	token: string
	user: User
	[key: string]: unknown
}

class Session {
	#data: SessionData

	constructor(data: SessionData) {
		this.#data = data
	}

	getSessionData() {
		return this.#data as Readonly<SessionData>
	}

	setSessionData(data: Partial<SessionData>) {
		this.#data = { ...this.#data, ...data }
	}

	deleteSessionData(key: keyof SessionData) {
		delete this.#data[key]
	}
}

export const sessionManager = new SessionManager()
export type { TempSessionId }