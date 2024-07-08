"use client"

import { create } from "zustand"
import type { User } from "../consts"

interface Values {
	user: User | null
}

interface Methods {
	setUser(user: User | null): void
}

type Store = Values & Methods

export const useUserStore = create<Store>((set, get) => ({
	user: null,

	setUser(user) {
		set({ user })
	},
}))
