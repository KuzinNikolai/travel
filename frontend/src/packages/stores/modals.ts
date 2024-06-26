import { create } from "zustand";

type ModalName = "auth";

type ModalState = Record<ModalName, boolean>;

interface Setters {
  setModal: (name: ModalName, status: boolean) => void;
}

type Storage = ModalState & Setters;

export const useModalsStore = create<Storage>((set) => ({
  auth: false,

  setModal(name, status) {
    set({ [name]: status });
  },
}));
