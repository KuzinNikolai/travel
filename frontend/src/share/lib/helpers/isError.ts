/**
 * @description
 * Test whether `value` is error object.
 *
 * @param value
 * @returns - `true` if `value` is error object, otherwise `false`.
 */
export function isError(value: unknown): value is Error {
	switch (Object.prototype.toString.call(value)) {
		case "[object Error]":
			return true
		case "[object Exception]":
			return true
		case "[object DOMException]":
			return true
		default:
			return value instanceof Error
	}
}
