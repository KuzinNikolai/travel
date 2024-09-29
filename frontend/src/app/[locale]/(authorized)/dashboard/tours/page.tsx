import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { getTranslations } from "next-intl/server"

export default async function ToursPage() {
	const t = await getTranslations()

	return (
		<>
			<HeaderWithBack title={t("pages.dashboard.pages.tours.title")} />
			<main />
		</>
	)
}

export async function generateMetadata() {
	const t = await getTranslations()

	return {
		title: t("pages.supplierTours.title"),
	}
}
