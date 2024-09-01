import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import type { Pathnames, LocalePrefix } from "next-intl/routing"
import type { getRequestConfig } from "next-intl/server"

const locales = ["en", "ru", "es"] as const
const defaultLocale = "ru" satisfies (typeof locales)[number]

const pathnames = { "/": "/" } satisfies Pathnames<typeof locales>

const localePrefix = "always" satisfies LocalePrefix<typeof locales>

type TimeZones = Awaited<ReturnType<Parameters<typeof getRequestConfig>[0]>>["timeZone"]
const defaultTZ = "Asia/Bangkok" satisfies TimeZones

const port = process.env.PORT || 3000
const host = API_DOMAIN ? `https://${API_DOMAIN}` : `http://localhost:${port}`

export { locales, defaultTZ, defaultLocale, pathnames, localePrefix, host }
