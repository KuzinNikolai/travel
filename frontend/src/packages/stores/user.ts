import { IUserData } from "@/entities/user.entity";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { logger } from "../utils/logger";

interface IUserStore {
  user: IUserData | null;
  setUser: (user: IUserData | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,

  setUser(user) {
    set({ user });
  },
}));

interface IPersistValues {
  t: string | null;
}

interface IPersistMethods {
  getToken(): string | null;
  setToken(token: string | null): void;
}

type IPersistStorage = IPersistValues & IPersistMethods;

export const useUserPersistStore = create(
  persist<IPersistStorage>(
    (set, get) => ({
      t: null,

      getToken() {
        const token = get().t;
        return token && atob(token);
      },
      setToken(token) {
        logger.debug("set token", token);
        set({ t: token && btoa(token) });
      },
    }),
    {
      name: "us", // user-storage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
