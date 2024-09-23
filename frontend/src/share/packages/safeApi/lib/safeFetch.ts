import { print } from "@share/packages/logger"
import { safe } from "../safe"

type Fetch = typeof fetch
type FetchArgs = Parameters<Fetch>
type FetchResult = ReturnType<Fetch>
type FetchFunc = (url: FetchArgs[0], init?: FetchArgs[1]) => Promise<Awaited<FetchResult> | undefined>

export const safeFetch: FetchFunc = async (url, init) => {
	const { success, data, error } = await safe(fetch(url, init))

	if (!success) {
		print.error("[safeFetch - error]", url, error)
	}

	return data
}
