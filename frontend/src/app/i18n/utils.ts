import { IntlErrorCode, type AbstractIntlMessages } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"
import * as i18nConfig from "./constants"
import { logger } from "@share/lib"

export const isValidLocale = (locale: unknown) => i18nConfig.locales.some((l) => l === locale)

export default getRequestConfig(async ({ locale }) => {
	if (!isValidLocale(locale)) {
		console.error("[i18n] Invalid locale", locale)
		notFound()
	}

	const messages = (await (import(`/messages/${locale}.json`) as Promise<{ default: AbstractIntlMessages }>)).default

	return {
		messages,
		onError(error) {
			if (error.code === IntlErrorCode.MISSING_MESSAGE) {
				// Missing translations are expected and should only log an error
				logger.error("[i18n] Missing translation", error)
			} else {
				// Other errors indicate a bug in the app and should be reported
				logger.error("[i18n] Failed to load translations", error)
			}
		},
		getMessageFallback({ namespace, key, error }) {
			const path = [namespace, key].filter((part) => part != null).join(".")

			if (error.code === IntlErrorCode.MISSING_MESSAGE) {
				return `${path} is not yet translated`
			}

			return `Dear developer, please fix this message: ${path}`
		},
	}
})
