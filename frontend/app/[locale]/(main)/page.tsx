import { MainPage as Main } from "@pages/Main"
import type { PagesProps } from "@share/lib"
import { unstable_setRequestLocale } from "next-intl/server"

export default async function MainPage({ params }: PagesProps<{ locale: string }>) {
	unstable_setRequestLocale(params.locale)

	return <Main />
}
