import { useUser } from "@entity/user"
import { Defender } from "@share/packages/auth"
import { getTranslations } from "next-intl/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ProfileHeader } from "./_components/Header"
import { UserEditForm } from "./_components/UserEditForm"

export default async function ProfileEditPage() {
	const {
		query: { data: user, isLoading },
		isAuthorized,
	} = useUser()

	if (isLoading) {
		return null
	}

	if (!isAuthorized || !user) {
		redirect("/")
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

	const clientCookies = cookies()

	const { getUser, isStaff } = new Defender(clientCookies)

	const userData = await getUser()

	if (!userData) {
		return {}
	}

	return {
		title: t("pages.profile.type.editProfile"),
	}
}
