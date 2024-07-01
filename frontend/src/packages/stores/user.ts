import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface IPersistValues {
	t: string | null
}

interface IPersistMethods {
	getToken(): string | null
	setToken(token: string | null): void
}

type IPersistStorage = IPersistValues & IPersistMethods

export const useUserPersistStore = create(
	persist<IPersistStorage>(
		(set, get) => ({
			t: null,

			getToken() {
				const token = get().t
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
