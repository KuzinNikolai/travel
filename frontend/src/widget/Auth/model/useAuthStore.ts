import { create } from "zustand"

type ModalState = {
	auth: boolean
}

interface Setters {
	setExpand: (status: boolean) => void
}

type Storage = ModalState & Setters

export const useAuthStore = create<Storage>((set) => ({
	auth: false,

	setExpand(status) {
		set({ auth: status })
	},
}))
