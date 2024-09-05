import { BecomeInfoStep } from "@pages/UserBecome"
import type { PagesProps } from "@share/lib"
import { unstable_setRequestLocale } from "next-intl/server"

export default async function BecomeInfoStepPage({params}: PagesProps<{ locale: string }>) {
	unstable_setRequestLocale(params.locale)
	return <BecomeInfoStep />
}
