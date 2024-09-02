"use client"

import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionQuery } from "@share/serverActions/model"
import { getUserAction } from "../serverActions/getUserAction"

export function useUser() {
	const query = useServerActionQuery(getUserAction, {
		input: {},
		queryKey: queryKeyFactory.user(),
	})

	return {
		query,
		isAuthorized:
			query.data &&
			query.isFetched &&
			!(query.error?.code === "NOT_AUTHORIZED" || query.error?.code === "INPUT_PARSE_ERROR"),
	}
}
