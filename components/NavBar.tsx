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
    <nav className="mb-4 flex flex-wrap items-center justify-center gap-3 bg-black p-4 sm:mb-8 sm:px-8 lg:grid lg:grid-cols-[1fr_minmax(0,25rem)_1fr]">
      <Logo />
      <div className="relative w-full max-w-100 lg:max-w-none">
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-placeholder" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search albums"
          placeholder="Search albums or artists"
          autoFocus
          className="focus-ring w-full rounded-md bg-input p-4 pr-12 pl-12 font-bold text-white placeholder:text-placeholder [&::-webkit-search-cancel-button]:appearance-none"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="focus-ring absolute top-1/2 right-3 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            <X aria-hidden="true" className="size-3.5" strokeWidth={3} />
          </button>
        )}
      </div>
    </nav>
  );
}
