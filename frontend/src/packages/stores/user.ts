import { IUserData, IUserValues } from "@/entities/user.entity";
import { createStore } from "zustand";

interface IUserMethods {
  verify(): boolean;

  setUser(user: IUserData): void;
  clear(): void;
}

type UserStore = IUserValues & IUserMethods;

export const useUserStore = createStore<UserStore>((set, get) => ({
  isVerify: false,
  user: null,

  setUser(user) {
    set({ user });
  },
  clear() {
    set({ user: null, isVerify: false });
  },
  verify() {
    if (!get().user) {
      return false;
    }
    set({ isVerify: true });
    return true;
  },
}));
