import { Section } from "lucide-react"
import { Fields } from "./_components/Fields"
import { ProfileHeader } from "./_components/Header"
import { UserInfo } from "./_components/UserInfo"
import { Defender } from "@share/packages/auth"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

export default async function ProfilePage() {
	const clientCookies = cookies()

	const { getUser, isStaff } = new Defender(clientCookies)

	const userData = await getUser()

	if (!userData) {
		notFound()
	}

	return (
		<main>
			<ProfileHeader type={(await isStaff()) ? "guide" : "user"} />
			<Section className='h-full flex-1'>
				<UserInfo user={userData.user} />
				<Fields user={userData.user} />
			</Section>
		</main>
	)
}

export async function generateMetadata() {
	const { getUser, isStaff } = new Defender(cookies())

	const userData = await getUser()

	if (!userData) {
		return {}
	}

	const t = await getTranslations()

	return {
		title: t("pages.profile.type.userProfile"),
		description: (await isStaff()) ? t("pages.profile.type.supplierProfile") : t("pages.profile.type.userProfile"),
	}
}
