import { safeApi } from "@share/packages/safeApi"
import { generateHeader } from "./generateHeader"

interface FetchInit extends RequestInit {
	token?: string
}

export async function fetch(url: string, init?: FetchInit, err?: string): Promise<Response | undefined> {
	const headers = generateHeader(init?.headers, init?.token)

	if (init?.body instanceof FormData) {
		headers["Content-Type"] = "multipart/form-data"
	}

	return await safeApi.fetch(url, { ...init, headers }, err)
}
