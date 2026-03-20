import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="relative flex items-center justify-between px-8 h-16">
        
          <Logo />
        <nav className="mx-auto flex items-center gap-12 text-light text-sm font-medium tracking-wide">
          <Link
            to="/"
            className=" hover:text-accent hover:scale-125 transition-all duration-300"
          >
            Search
          </Link>

          <Link
            to="/watchlist"
            className=" hover:text-accent hover:scale-125 transition-all duration-300">
            Watchlist
          </Link>
        </nav>

        <div className="flex items-center gap-2 text-light/70 text-sm">
          <span className="font-semibold text-light">Test Task</span>
          <span className="opacity-50">/</span>
          <span className="hover:text-light">Fast Solutions</span>
        </div>

      </div>
    </header>
  );
};

export default Header;