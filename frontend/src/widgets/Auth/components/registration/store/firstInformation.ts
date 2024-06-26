"use client";

import { SafeJson } from "@/packages/utils/SafeJson";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { FirstInfo, firstInfoSchema } from "../schema";

interface IValues {
  formData: string | null;
}

interface IMethods {
  getFormData(): FirstInfo | null;
  setFormData(data: FirstInfo | null): void;
}

type IStorage = IValues & IMethods;

export const useFirstInfoStore = create(
  persist<IStorage>(
    (set, get) => ({
      formData: null,

      getFormData() {
        try {
          const str = atob(get().formData ?? "null");
          const data = str === "null" ? null : SafeJson.parse(str);
          const res = firstInfoSchema.safeParse(data).data;

          if (!res) {
            set({ formData: null });
            return null;
          }

          return res;
        } catch {
          set({ formData: null });
          return null;
        }
      },
      setFormData(data) {
        const str = SafeJson.stringify(data);
        set({ formData: str ? btoa(str) : null });
      },
    }),
    {
      name: "afis", // auth-first-info-storage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
