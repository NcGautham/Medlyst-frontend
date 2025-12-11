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
    <div className={cn("bg-card rounded-2xl shadow-soft p-4", className)}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search doctors by name, specialty..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Search doctors"
          />
        </div>

        {/* Specialty Select */}
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="px-4 py-3 bg-muted rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          aria-label="Select specialty"
        >
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        {/* Filter Toggle (Mobile) */}
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          Filters
        </Button>

        {/* Search Button */}
        <Button onClick={handleSearch} size="lg" className="hidden md:flex">
          <MagnifyingGlassIcon className="w-5 h-5" />
          Search
        </Button>
      </div>

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
                    onClick={() => setRating(r)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
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
            <Button onClick={handleSearch} className="w-full">
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
