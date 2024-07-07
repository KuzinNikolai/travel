const units = {
	Y: 31536000000,
	M: 2628000000,
	d: 86400000,
	h: 3600000,
	m: 60000,
	s: 1000,
} as const
const regexUnit = new RegExp(`([1-9])+(${Object.keys(units).join("|")})`)

export class Time {
	static toMs(timeStr: string) {
		const totalMs = 0
		// for (const [_, value, unit] of timeStr.matchAll(regexUnit)) {
		// 	totalMs += Number(value) * units[unit as keyof typeof units]
		// }
		return totalMs
	}
}
