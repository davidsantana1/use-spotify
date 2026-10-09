import { useRef } from "react";
import { Search, X } from "lucide-react";
import { Logo } from "./Logo";

interface NavBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function NavBar({ query, onQueryChange }: NavBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function clear() {
    onQueryChange("");
    inputRef.current?.focus();
  }

  return (
    <nav className="mb-3 flex items-center justify-center gap-3 bg-black px-4 py-3 sm:mb-8 sm:gap-4 sm:px-8 sm:py-4 lg:grid lg:grid-cols-[1fr_minmax(0,25rem)_1fr]">
      <Logo />
      <div className="relative min-w-0 flex-1 sm:max-w-100 lg:max-w-none">
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-placeholder" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search albums"
          placeholder="Search albums or artists"
          autoFocus
          className="w-full rounded-full bg-input py-2.5 pr-11 pl-11 font-bold outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-white sm:py-3 text-white placeholder:text-placeholder [&::-webkit-search-cancel-button]:appearance-none"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="focus-ring absolute top-1/2 right-2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            <X aria-hidden="true" className="size-3.5" strokeWidth={3} />
          </button>
        )}
      </div>
    </nav>
  );
}
