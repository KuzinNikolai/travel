import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export default async function ToursPage() {
	return <>void</>
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations()

	return {
		title: t("pages.supplierTours.title"),
	}
}
