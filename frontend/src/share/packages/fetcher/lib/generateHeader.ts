export function generateHeader(customHeaders?: HeadersInit, token?: string) {
	return {
		"Content-Type": "application/json",
		...(token && { Authorization: `Token ${token}` }),
		...customHeaders,
	}
}
