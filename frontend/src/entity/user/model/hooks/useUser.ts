"use client"

import { queryKeyFactory, useServerActionQuery } from "@share/packages/serverActions"
import { getUserAction } from "../serverActions/getUserAction"

export function useUser() {
	const query = useServerActionQuery(getUserAction, { input: undefined, queryKey: queryKeyFactory.user() })

	return {
		query,
		isAuthorized:
			query.data &&
			query.isFetched &&
			!(query.error?.code === "NOT_AUTHORIZED" || query.error?.code === "INPUT_PARSE_ERROR"),
	}
}
