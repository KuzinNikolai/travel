"use client"

import { useUser } from "@entity/user"
import { redirect } from "next/navigation"
import { UserEditForm } from "./components/UserEditForm"
import { ProfileHeader } from "./components/Header"

export const UserProfileEdit = () => {
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
