"use client"

import { logger } from "@share/lib"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Values {
	t: string | null
}

interface Methods {
	getToken(): string | null
	setToken(token: string | null): void
}

type Store = Values & Methods

export const useUserTokenStore = create(
	persist<Store>(
		(set, get) => ({
			t: null,

			getToken() {
				const { t: token } = get()
				return token && atob(token)
			},
			setToken(token) {
				set({ t: token && btoa(token) })
			},
		}),
		{
			name: "us", // user-storage
			storage: createJSONStorage(() => localStorage),
		},
	),
)
