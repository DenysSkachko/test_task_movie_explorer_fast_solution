import { useWatchlistStore } from "../stores/watchlistStore";
import { GoStarFill } from "react-icons/go";
import { RiDeleteBack2Fill } from "react-icons/ri";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
}

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const { watchlist, add, remove } = useWatchlistStore();

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleClick = () => {
    if (isInWatchlist) {
      remove(movie.id);
    } else {
      add(movie);
    }
  };

  const year =
    movie.release_date?.slice(0, 4) ||
    "—";

  return (
    <div className="bg-dark relative rounded overflow-hidden">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="object-cover h-full w-full"
        />
      ) : (
        <div className="h-full flex items-center justify-center bg-dark text-light">
          No Image
        </div>
      )}

      <div className="absolute inset-0 bg-dark/90 text-light flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-all duration-500">
        <h3 className="font-bold px-2 text-center mb-1">
          {movie.title || movie.name}
        </h3>

        <div className="text-xs opacity-80">
          {year}
        </div>
      </div>

      <button
        onClick={handleClick}
        className={`absolute top-2 right-2 px-2 py-1 rounded hover:opacity-50 transition-all duration-300 ${
          isInWatchlist
            ? "bg-red-500 text-white"
            : "bg-dark text-yellow-500"
        }`}
      >
        {isInWatchlist ? <RiDeleteBack2Fill /> : <GoStarFill />}
      </button>
    </div>
  );
};

export default MovieCard;