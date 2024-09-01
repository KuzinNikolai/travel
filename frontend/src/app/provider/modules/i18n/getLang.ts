import { i18nConfig, i18nUtils } from "@app/i18n"
import { getMessages } from "next-intl/server"

export async function getLang(locale: string) {
	const lang = i18nUtils.isValidLocale(locale) ? locale : i18nConfig.defaultLocale
	const messages = await getMessages({ locale: lang })
	return { lang, messages }
}
