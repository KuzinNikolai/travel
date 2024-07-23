"use client"

import { useUser } from "@entity/user"
import { redirect } from "next/navigation"
import { UserEditForm } from "./UserEditForm"
import { ProfileHeader } from "./Header"

export const ProfileEditPage = () => {
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
