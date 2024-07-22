"use client"

import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionQuery } from "@share/serverActions/model"
import { getUser } from "../api/getUser"
import { useUserTokenStore } from "./userTokenStore"

export function useUser() {
	const { getToken } = useUserTokenStore()

	const query = useServerActionQuery(getUser, {
		input: getToken() || "",
		queryKey: queryKeyFactory.account(),
	})

	return {
		query,
		isAuthorized:
			query.data &&
			query.isFetched &&
			!(query.error?.code === "NOT_AUTHORIZED" || query.error?.code === "INPUT_PARSE_ERROR"),
	}
}
