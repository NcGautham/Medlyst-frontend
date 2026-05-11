import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { specialties } from '@/data/doctors';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string, specialty: string, rating: number) => void;
  className?: string;
}

const ratingChoices = [0, 4, 4.5, 4.8] as const;

export const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [specialty, setSpecialty] = useState(
    searchParams.get('specialty') || 'All Specialties',
  );
  const [rating, setRating] = useState(Number(searchParams.get('rating')) || 0);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback(() => {
    onSearch(query, specialty, rating);
  }, [query, specialty, rating, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div
      className={cn(
        'glass-card card-accent-line rounded-2xl p-3 shadow-soft sm:p-4',
        className,
      )}
    >
      <div className="flex flex-col gap-2.5 md:flex-row md:items-stretch md:gap-3">
        {/* Search input */}
        <div className="relative min-w-0 flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />
          <input
            type="text"
            placeholder="Search by name, specialty, hospital..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-dark pl-11 md:text-sm"
            aria-label="Search doctors"
          />
        </div>

        {/* Specialty select */}
        <div className="w-full min-w-0 md:max-w-[15rem] lg:max-w-xs">
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="input-dark cursor-pointer md:text-sm"
            aria-label="Select specialty"
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec} className="bg-[#061509]">
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Filters (mobile toggle) */}
        <button
          type="button"
          onClick={() => setShowFilters((s) => !s)}
          className={cn(
            'tap-raise inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#346739]/35 bg-[#0a1d11]/55 px-4 text-sm font-medium text-white/75 transition-colors hover:border-[#5aad68]/55 hover:text-white md:hidden',
            showFilters && 'border-[#5aad68]/55 bg-[#346739]/25 text-white',
          )}
          aria-expanded={showFilters}
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Filters
        </button>

        {/* Search button (desktop) */}
        <button
          type="button"
          onClick={handleSearch}
          className="tap-raise hidden min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#346739] px-6 font-semibold text-white shadow-glow-sm transition-colors hover:bg-[#3f8548] md:inline-flex"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          Search
        </button>
      </div>

      {/* Mobile search button shown when filters collapsed */}
      {!showFilters && (
        <button
          type="button"
          onClick={handleSearch}
          className="tap-raise mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#346739] font-semibold text-white shadow-glow-sm transition-colors hover:bg-[#3f8548] md:hidden"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          Search
        </button>
      )}

      {/* Mobile filters */}
      {showFilters && (
        <div className="mt-4 border-t border-[#346739]/15 pt-4 md:hidden">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/55">
                Minimum Rating
              </label>
              <div className="flex flex-wrap gap-2">
                {ratingChoices.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRating(r)}
                    className={cn(
                      'tap-raise min-h-11 flex-1 rounded-xl border px-3 text-sm font-medium transition-all',
                      rating === r
                        ? 'border-[#5aad68]/60 bg-[#346739]/30 text-white shadow-glow-sm'
                        : 'border-[#346739]/25 bg-[#0a1d11]/50 text-white/65 hover:border-[#5aad68]/40 hover:text-white',
                    )}
                  >
                    {r === 0 ? 'Any' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="tap-raise inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#346739] font-semibold text-white shadow-glow-sm transition-colors hover:bg-[#3f8548]"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              Apply &amp; Search
            </button>
          </div>
        </div>
      )}

      {/* Desktop rating filter */}
      <div className="mt-4 hidden items-center gap-4 border-t border-[#346739]/15 pt-4 md:flex">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
          Rating
        </span>
        <div className="flex gap-2">
          {ratingChoices.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRating(r);
                onSearch(query, specialty, r);
              }}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                rating === r
                  ? 'border-[#5aad68]/60 bg-[#346739]/30 text-white'
                  : 'border-[#346739]/25 bg-[#0a1d11]/40 text-white/60 hover:border-[#5aad68]/40 hover:text-white',
              )}
            >
              {r === 0 ? 'Any' : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
