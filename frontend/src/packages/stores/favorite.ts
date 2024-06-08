import { createStore } from "zustand";

type FavoriteItem = number;

interface IFavoriteValues {
  tours: FavoriteItem[];
}

interface IFavoriteMethods {
  isFavoriteTour(tourId: FavoriteItem): void;
  addTour(tourId: FavoriteItem): void;
  removeTour(tourId: FavoriteItem): void;
}

type FavoriteStorage = IFavoriteValues & IFavoriteMethods;

export const useFavoriteStore = createStore<FavoriteStorage>((set, get) => ({
  tours: [] as FavoriteItem[],

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
}));
