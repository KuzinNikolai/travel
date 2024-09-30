const formatMultiple = {
	s: 1000,
	m: 60 * 1000,
	h: 60 * 60 * 1000,
} as const

const formatRegexp = new RegExp(`^(([0-9])+(${Object.keys(formatMultiple).join("|")})(\s?))*$`, "g")

/**
 * @description
 * Convert format string to milliseconds.
 *
 * @example
 * toMs("5s 1m 1h 1d 1w 1M 1y") //
 *
 * @param format - format date
 */
export const toMs = (format: string) => {
	const splitFormats = format.split(" ")
	let res = 0

	for (const format of splitFormats) {
		const [_, _1, num, type] = format.match(formatRegexp) || []

		if (!num || !type) {
			continue
		}

		res += Number.parseInt(num) * formatMultiple[type as (typeof formats)[number]]
	}

	return res
}
