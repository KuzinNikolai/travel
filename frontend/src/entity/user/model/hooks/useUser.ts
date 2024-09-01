"use client"

import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionQuery } from "@share/serverActions/model"
import { getUser } from "../serverActions/getUser"

export function useUser() {
	const query = useServerActionQuery(getUser, {
		input: {},
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
