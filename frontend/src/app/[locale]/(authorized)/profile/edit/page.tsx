import { defender } from "@share/packages/auth"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { ProfileHeader } from "./_components/Header"
import { UserEditForm } from "./_components/UserEditForm"

export default async function ProfileEditPage() {
	const user = await defender.getUser()

	if (!user) {
		notFound()
	}

	return (
		<>
			<ProfileHeader type={user.is_staff ? "guide" : "user"} />
			<UserEditForm user={user} />
		</>
	)
}

export async function metadata() {
	const t = await getTranslations()

	return {
		title: t("pages.profile.type.editProfile"),
	}
}
