const TIME_TO_LIVE = 1000 * 60 // 1 minute

export class Memo<T> {
	#cache = new Map<string, T>()

	get(key: string) {
		return this.#cache.get(key)
	}

	hasMemoized(key: string) {
		return this.#cache.has(key)
	}

	set(key: string, value: T, timeToLive = TIME_TO_LIVE) {
		this.#cache.set(key, value)

		if (Number.isFinite(timeToLive)) return

		setTimeout(() => {
			this.#cache.delete(key)
		}, timeToLive)
	}

	delete(key: string) {
		this.#cache.delete(key)
	}

	clear() {
		this.#cache.clear()
	}

	get length() {
		return this.#cache.size
	}
}
