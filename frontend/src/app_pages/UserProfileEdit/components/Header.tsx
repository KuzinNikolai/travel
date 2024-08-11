import { Header } from "@share/ui/Headers"
import type { FC } from "react"

interface HeaderProps {
	type: "user" | "guide"
}

export const ProfileHeader: FC<HeaderProps> = ({ type }) => {
	return <Header title={type === "user" ? "Настройка профиля" : "Настройка профиля гида"} />
}
