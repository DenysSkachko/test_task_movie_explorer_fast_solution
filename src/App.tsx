import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage/SearchPage";
import WatchlistPage from "./pages/WatchlistPage/WatchlistPage";
import Header from "./ui/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="bg-light-hover min-h-screen pt-15 ">
        <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;