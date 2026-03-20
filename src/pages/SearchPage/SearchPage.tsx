import { useEffect, useMemo, useState } from "react";
import MovieCard from "../../ui/MovieCard";
import Pagination from "../../ui/Pagination";
import { paginateAndFilter } from "../../utils/paginateAndFilter";

const API_KEY = "66526d5b220f8dabd4147e932c37bec3";
const PAGE_SIZE = 10;
const MAX_ITEMS = 1000;

const SearchPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTopItems = async () => {
      setLoading(true);
      setError(false);

      try {
        let allItems: any[] = [];
        const totalPages = Math.ceil(MAX_ITEMS / 20);

        for (let i = 1; i <= totalPages; i++) {
          const [moviesRes, tvRes] = await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${i}`
            ),
            fetch(
              `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=${i}`
            ),
          ]);

          const movies = await moviesRes.json();
          const tv = await tvRes.json();

          allItems.push(...(movies.results || []));
          allItems.push(...(tv.results || []));
        }

        setItems(allItems.slice(0, MAX_ITEMS));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTopItems();
  }, []);

  const { data: displayItems, total } = useMemo(() => {
    return paginateAndFilter(items, page, PAGE_SIZE, query);
  }, [items, page, query]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="p-6 w-full">
     <div className="text-left mb-4">
         <h4 className="uppercase font-semibold text-black text-xl">Movies Online in Full HD</h4>
        <p>
          Did you know that long before streaming platforms existed, people were already enjoying movies in entirely different ways? In the early days of cinema, watching a film was a special event — something planned, shared, and experienced together.

Today, everything has changed. You can explore and watch movies online anytime, without schedules or limitations. From the latest releases to timeless classics, everything is available in just a few clicks.

Discover new stories, revisit your favorites, and enjoy movies in high quality whenever you want.
 
        </p>
     </div>
      <div className="flex gap-2 mb-4">
        <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search movies & TV..."
        className=" p-2 w-full border rounded bg-light outline-none"
      /><Pagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {!loading && displayItems.length === 0 && <p className="p-6">No results found</p>}

      <div className="grid grid-cols-5 gap-4 mb-4">
        {displayItems.map((item: any) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>

      
    </div>
  );
};

export default SearchPage;