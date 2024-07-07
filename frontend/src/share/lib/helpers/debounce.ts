/**
 * @description
 * Create debounced effect
 *
 * This function create a debounced callback, which will be called only after a specified delay.
 * It's used to prevent multiple execution of a function in a short time.
 *
 * @param cb - The callback function to be debounced.
 * @param delay - The delay in milliseconds.
 * @returns The debounced callback function.
 *
 * @example
 *
 */
export function createDebounce<T extends unknown[]>(cb: (...args: T) => void, delay: number) {
	let timeoutId: NodeJS.Timeout | null = null

	const debounceEffect = (...arr: T) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => cb(...arr), delay)
	}

	return debounceEffect
}
