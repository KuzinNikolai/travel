"use client"

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { setupServerActionHooks } from "zsa-react-query"
import { queryKeyFactory } from "./queryKeyFactory"

const { useServerActionQuery, useServerActionMutation, useServerActionInfiniteQuery } = setupServerActionHooks({
	hooks: {
		useQuery: useQuery,
		useMutation: useMutation,
		useInfiniteQuery: useInfiniteQuery,
	},
	queryKeyFactory,
})

export { useServerActionInfiniteQuery, useServerActionMutation, useServerActionQuery }
