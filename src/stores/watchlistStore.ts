import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type?: string;
}

interface WatchlistState {
  watchlist: Movie[];
  add: (movie: Movie) => void;
  remove: (id: number) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      add: (movie: Movie) => {
        const exists = get().watchlist.find((m) => m.id === movie.id);
        if (!exists) set({ watchlist: [...get().watchlist, movie] });
      },
      remove: (id: number) => {
        set({ watchlist: get().watchlist.filter((m) => m.id !== id) });
      },
    }),
    {
      name: "watchlist-storage",
    }
  )
);