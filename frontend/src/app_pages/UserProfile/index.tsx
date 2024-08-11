"use client"

import { useUser } from "@entity/user"
import { Section } from "@share/ui/Layout"
import { redirect } from "next/navigation"
import { Fields } from "./components/Fields"
import { ProfileHeader } from "./components/Header"
import { UserInfo } from "./components/UserInfo"

export const UserProfile = () => {
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
			<Section className='h-full flex-1'>
				<UserInfo user={user} />
				<Fields user={user} />
			</Section>
		</>
	)
}
