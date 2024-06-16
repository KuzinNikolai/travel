import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type WishItem = number;

interface IWishValues {
  tours: WishItem[];
}

interface IWishMethods {
  isFavoriteTour(tourId: WishItem): void;
  addTour(tourId: WishItem): void;
  removeTour(tourId: WishItem): void;
}

type FavoriteStorage = IWishValues & IWishMethods;

export const useWishlistStore = create(
  persist<FavoriteStorage>(
    (set, get) => ({
        tours: [] as WishItem[],
  
      isFavoriteTour(tourId) {
        return get().tours.includes(tourId);
      },
      addTour(tourId) {
        const { tours } = get();
        tours.push(tourId);
        set({ tours });
      },
      removeTour(tourId) {
        const { tours } = get();
        set({ tours: tours.filter((_tourId) => _tourId !== tourId) });
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
