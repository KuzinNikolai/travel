import { safeFetch } from "./lib/safeFetch"
import { SafeJson } from "./lib/SafeJson"
export { safe } from "./safe"

export const safeApi = {
	fetch: safeFetch,
	json: SafeJson,
}
