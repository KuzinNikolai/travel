import { defender } from "@share/packages/auth"
import { Section } from "@share/ui/Layout"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Fields } from "./_components/Fields"
import { ProfileHeader } from "./_components/Header"
import { UserInfo } from "./_components/UserInfo"

export default async function ProfilePage() {
	const userData = await defender.getUser()
	const isStaff = await defender.isStaff()

	if (!userData) {
		notFound()
	}

	return (
		<main>
			<ProfileHeader type={isStaff ? "guide" : "user"} />
			<Section className='h-full flex-1'>
				<UserInfo user={userData} />
				<Fields user={userData} />
			</Section>
		</main>
	)
}

export async function generateMetadata() {
	const isStaff = await defender.isStaff()

	if (!isStaff) {
		return {}
	}

	const t = await getTranslations()

	return {
		title: t("pages.profile.type.userProfile"),
		description: isStaff ? t("pages.profile.type.supplierProfile") : t("pages.profile.type.userProfile"),
	}
}
