import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IProgram } from "../schemes/travel/program.schema";
import { ITour } from "../schemes/travel/tour.schema";

interface IValues {
  tourSlug: ITour["slug"] | null;
  programId: IProgram["id"] | null;
}

interface IMethods {
  setTour(tourSlug: ITour["slug"]): void;
  setProgram(programId: IProgram["id"]): void;
  reset(): void;
}

type IOrderStorage = IValues & IMethods;

export const useOrderStore = create(
  persist<IOrderStorage>(
    (set) => ({
      tourSlug: null,
      programId: null,

      setTour(tourSlug) {
        set({ tourSlug });
      },
      setProgram(programId) {
        set({ programId });
      },
      reset() {
        set({ tourSlug: null, programId: null });
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
