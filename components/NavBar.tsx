import { Logo } from "./Logo";

interface NavBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  resultCount: number;
}

export function NavBar({ query, onQueryChange, resultCount }: NavBarProps) {
  return (
    <nav className="mb-4 flex flex-wrap items-center justify-center gap-3 bg-black p-4 text-center sm:mb-8 sm:px-8 lg:flex-nowrap lg:justify-between lg:text-left">
      <Logo />
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Search albums"
        placeholder="Search your favorite song"
        className="w-full max-w-100 rounded-md bg-input p-4 font-bold text-white placeholder:text-placeholder focus:outline-3 focus:outline-spotify"
      />
      <p className="w-full text-lg font-bold text-white lg:w-auto" aria-live="polite">
        Found {resultCount} results
      </p>
    </nav>
  );
}
