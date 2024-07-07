import { useUserTokenStore } from "@entity/user"
import { useMutation } from "react-query"
import { clientLogout } from "../api/client"

export function useLogout() {
	const { setToken } = useUserTokenStore()
	const logout = useMutation({
		async mutationFn() {
			const response = clientLogout()

			const responseValue = await response

			if ("code" in responseValue) {
				switch (responseValue.code) {
					case "SERVER_ERROR":
						break
					case "FORBIDDEN":
						break
					default:
						break
				}
			} else {
				setToken(null)
			}

			return response
		},
		onSuccess: () => {
			window.location.href = "/"
		},
	})

	return { logout: logout.mutateAsync }
}
