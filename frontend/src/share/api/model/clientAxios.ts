"use client"

import { getToken } from "@entity/user"
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
	const token = getToken()

	if (!token) {
		return config
	}

	config.headers.Authorization = `Token ${token}`

	return config
})

export { clientAxios, clientAxiosWithToken }
