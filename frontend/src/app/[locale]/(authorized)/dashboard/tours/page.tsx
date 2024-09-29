import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { getTranslations } from "next-intl/server"

export default async function ToursPage() {
	return <>void</>
}

export async function generateMetadata() {
	const t = await getTranslations()

	return {
		title: t("pages.supplierTours.title"),
	}
}
