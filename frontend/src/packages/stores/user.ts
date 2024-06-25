import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IValues {
  t: string | null;
}

interface IMethods {
  getToken(): string | null;
  setToken(token: string | null): void;
}

type IStorage = IValues & IMethods;

export const useUserStore = create(
  persist<IStorage>(
    (set, get) => ({
      t: null,

      getToken() {
        const token = get().t;
        return token && atob(token);
      },
      setToken(token) {
        set({ t: token && btoa(token) });
      },
    }),
    {
      name: "us", // user-storage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
