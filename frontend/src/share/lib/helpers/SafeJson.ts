export class SafeJson {
	static parse(data: string): unknown | undefined {
		try {
			return JSON.parse(data)
		} catch (e) {}
	}

	static stringify(data: unknown, replace?: never, space?: number): string | undefined {
		try {
			return JSON.stringify(data, replace, space)
		} catch (e) {}
	}
}
