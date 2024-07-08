"use client"

import { useUserTokenStore } from "@entity/user"
import { logger } from "@share/lib"
import Axios from "axios"

const clientAxios = Axios.create({
	baseURL: "/externalApi",
	headers: {
		"Content-Type": "application/json",
	},
})

const clientAxiosWithToken = Axios.create({
	baseURL: "/externalApi",
	headers: {
		"Content-Type": "application/json",
	},
})

clientAxiosWithToken.interceptors.request.use((config) => {
	const token = useUserTokenStore().getToken()

	logger.debug("token", token)

	if (!token) {
		return config
	}

	config.headers.Authorization = `Token ${token}`

	return config
})

export { clientAxios, clientAxiosWithToken }
