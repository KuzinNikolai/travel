import { type i18nConfig, i18nUtils } from "@app/i18n";
import { useLocale as useIntlLocale } from "next-intl";
import { useMemo } from "react";
import { isServerEnv } from "./isBrowser";

export function useLocale() {
	const lang = useIntlLocale();

	const currentLang = useMemo(() => {
		if (isServerEnv()) return;
		const _lang = window.navigator.languages
			.at(-1)
			?.split("-")[0]
			.toLocaleLowerCase();
		return (
			i18nUtils.isValidLocale(_lang) ? _lang : lang
		) as (typeof i18nConfig)["locales"][number];
	}, [lang]);

	return { currentLang, lang };
}
