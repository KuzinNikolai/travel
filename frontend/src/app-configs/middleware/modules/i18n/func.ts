import createMiddleware from "next-intl/middleware"
import { i18nConfig } from "@share/i18n"
import type { MiddlewareModuleFunc } from "../../types"

const intlMiddleware = createMiddleware({
	locales: i18nConfig.locales,
	defaultLocale: i18nConfig.defaultLocale,
	localePrefix: i18nConfig.localePrefix,
	localeDetection: true,
})

export const middlewareFunc: MiddlewareModuleFunc = (req) => {
	return intlMiddleware(req)
}
