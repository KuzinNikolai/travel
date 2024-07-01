type Primitive = string | number | boolean | null | undefined

export const createUniqChecker = <T extends (Primitive | (() => void))[]>(cb: (...args: T) => void) => {
	let lastValue: T | null = null

	const uniqSaverEffect = (...args: T) => {
		let uniq = true

		args.forEach((arg, i) => {
			if (typeof arg === "function") return

			if (lastValue && lastValue[i] === arg) {
				uniq = false
			}
		})

		if (uniq) {
			lastValue = args
			cb(...args)
		}
	}

	return uniqSaverEffect
}
