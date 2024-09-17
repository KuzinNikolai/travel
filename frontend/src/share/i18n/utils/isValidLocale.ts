import { locales } from "../constants"

export function isValidLocale(locale: unknown): locale is typeof locales[number] {
	return locales.some((l) => l === locale)
}
