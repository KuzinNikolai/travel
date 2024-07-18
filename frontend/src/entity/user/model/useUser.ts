"use client"

import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionQuery } from "@share/serverActions/model"
import { useEffect } from "react"
import { getUser } from "../api/getUser"
import { useUserTokenStore } from "./userTokenStore"

export function useUser() {
	const { getToken } = useUserTokenStore()

	const query = useServerActionQuery(getUser, {
		input: getToken() || "",
		queryKey: queryKeyFactory.account(),
	})

	return query
}
