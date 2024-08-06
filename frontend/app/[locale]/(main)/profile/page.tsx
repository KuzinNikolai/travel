import { ProfilePage } from "./_components/ProfilePage"

export const dynamic = "force-static"

const Profile = () => {
	return <ProfilePage />
}

export default Profile

export function generateMetadata() {
	return {
		title: "Профиль",
		description: "Профиль пользователя",
	}
}
