import { print } from "@share/packages/logger"
import { type AbstractIntlMessages, IntlErrorCode } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"
import { isValidLocale } from "./isValidLocale"
import { defaultTZ } from "../constants"

export default getRequestConfig(async ({ locale }) => {
	if (!isValidLocale(locale)) {
		console.error("[i18n] Invalid locale", locale)
		notFound()
	}

	const messages = (
		await (import(`/messages/${locale}.json`) as Promise<{
			default: AbstractIntlMessages
		}>)
	).default

	return {
		messages,
		timeZone: defaultTZ,
		onError(error) {
			if (error.code === IntlErrorCode.MISSING_MESSAGE) {
				// Missing translations are expected and should only log an error
				print.error("[i18n] Missing translation", error)
			} else {
				// Other errors indicate a bug in the app and should be reported
				print.error("[i18n] Failed to load translations", error)
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
