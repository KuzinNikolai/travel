import type { User } from "../consts"
import { getUsers } from "./getUsers"

export async function getUserInformation(userId: User["id"], token: string) {
	const resp = await getUsers(token)
	return resp.find((user) => user.id === userId)
}