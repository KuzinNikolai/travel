import { safeFetch } from "./lib/safeFetch";
import { SafeJson } from "./lib/SafeJson";

export const safeApi = {
	fetch: safeFetch,
	json: SafeJson,
}
