"use client"

import { useUser } from "@entity/user"
import { Section } from "@share/ui/Layout"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Fields } from "./Fields"
import { ProfileHeader } from "./Header"
import { UserInfo } from "./UserInfo"

export const ProfilePage = () => {
	const [isEditMode, setEditMode] = useState(false)

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

	const onToggleEditMode = () => {
		setEditMode(!isEditMode)
	}

	return (
		<>
			<ProfileHeader type={user.is_staff ? "guide" : "user"} />
			<Section
				title='Профиль'
				containerClassNames='h-full'
				hiddenTitle
			>
				<UserInfo user={user} />
				<Fields user={user} />
			</Section>
		</>
	)
}
