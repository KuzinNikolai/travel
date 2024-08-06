import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import type { Pathnames, LocalePrefix } from "next-intl/routing"

const locales = ["en", "ru", "es"] as const
const defaultLocale = "ru" satisfies (typeof locales)[number]

const pathnames = { "/": "/" } satisfies Pathnames<typeof locales>

const localePrefix = "always" satisfies LocalePrefix<typeof locales>

const port = process.env.PORT || 3000
const host = API_DOMAIN ? `https://${API_DOMAIN}` : `http://localhost:${port}`

export { locales, defaultLocale, pathnames, localePrefix, host }