import type { ServerFetchError } from "./serverFetch";

export function isErrorResponse(data: unknown): data is ServerFetchError {
	return typeof data === "object" && data !== null && "code" in data
}