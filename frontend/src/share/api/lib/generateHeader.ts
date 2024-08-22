export function generateHeader(token?: string) {
	return {
		"Content-Type": "application/json",
		...(token && { Authorization: `Token ${token}` }),
	};
}
