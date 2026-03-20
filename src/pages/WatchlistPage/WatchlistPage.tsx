import { useWatchlistStore } from "../../stores/watchlistStore";
import MovieCard from "../../ui/MovieCard";

const WatchlistPage = () => {
  const watchlist = useWatchlistStore((state) => state.watchlist);

  return (
    <div className="p-6 w-full">
        <div className="text-left mb-4">
         <h4 className="uppercase font-semibold text-black text-xl">My Watchlist</h4>
        <p>
      Keeping track of movies and TV shows has never been easier. Your watchlist is a personal space where you can save everything you plan to watch — from trending releases to hidden gems you don’t want to forget.

Whether it’s a movie you discovered today or a series you’ve been meaning to start for weeks, everything is stored here in one place. No need to remember titles or search again — just open your watchlist and continue where you left off.

Add, remove, and manage your collection anytime to keep it relevant and tailored to your taste.
        </p>
     </div>
      <h2 className="mb-4 p-2 w-full border rounded bg-light outline-none">
        My Watchlist
      </h2>

      {!watchlist.length && <p className="p-6">Your watchlist is empty.</p>}

      <div className="grid grid-cols-5 gap-4">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;