import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { specialties } from '@/data/doctors';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string, specialty: string, rating: number) => void;
  className?: string;
}

export const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || 'All Specialties');
  const [rating, setRating] = useState(Number(searchParams.get('rating')) || 0);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback(() => {
    onSearch(query, specialty, rating);
  }, [query, specialty, rating, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn('rounded-2xl bg-card p-3 shadow-soft sm:p-4', className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-4">
        {/* Search Input */}
        <div className="relative min-w-0 flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground sm:left-4" />
          <input
            type="text"
            placeholder="Search doctors by name, specialty..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-11 w-full rounded-xl border border-transparent bg-muted py-3 pl-11 pr-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 sm:min-h-10 sm:pl-12 sm:pr-4 md:text-sm"
            aria-label="Search doctors"
          />
        </div>

        {/* Specialty Select */}
        <div className="w-full min-w-0 md:max-w-[14rem] lg:max-w-xs">
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="min-h-11 w-full cursor-pointer rounded-xl border border-transparent bg-muted px-3 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 sm:min-h-10 sm:px-4 md:text-sm"
          aria-label="Select specialty"
        >
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        </div>

        {/* Filter Toggle (Mobile) */}
        <Button
          variant="outline"
          type="button"
          className="min-h-11 w-full shrink-0 md:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Filters
        </Button>

        {/* Search Button (desktop) */}
        <Button onClick={handleSearch} size="lg" className="hidden min-h-11 shrink-0 md:inline-flex">
          <MagnifyingGlassIcon className="h-5 w-5" />
          Search
        </Button>
      </div>

      {!showFilters && (
        <Button onClick={handleSearch} size="lg" className="mt-3 min-h-11 w-full md:hidden">
          <MagnifyingGlassIcon className="h-5 w-5" />
          Search
        </Button>
      )}

      {/* Mobile Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-border md:hidden">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRating(r)}
                    className={cn(
                      'min-h-11 flex-1 rounded-lg px-2 py-2 text-sm font-medium transition-colors sm:min-h-10 sm:flex-none sm:px-3',
                      rating === r
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {r === 0 ? 'Any' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleSearch} className="min-h-11 w-full">
              Search
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Rating Filter */}
      <div className="hidden md:flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <span className="text-sm font-medium text-foreground">Rating:</span>
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => {
                setRating(r);
                onSearch(query, specialty, r);
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                rating === r
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
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
