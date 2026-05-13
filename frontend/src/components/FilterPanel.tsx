import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFilters } from '../api/universities';

interface FilterPanelProps {
  search: string;
  country: string;
  specialty: string;
  onSearchChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function FilterPanel({
  search,
  country,
  specialty,
  onSearchChange,
  onCountryChange,
  onSpecialtyChange,
  onClearFilters,
}: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: filtersData } = useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
    staleTime: 5 * 60 * 1000,
  });

  const countries = filtersData?.data?.countries ?? [];
  const specialties = filtersData?.data?.specialties ?? [];

  const hasActiveFilters = search !== '' || country !== '' || specialty !== '';

  const panelContent = (
    <div className="flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        Filters
      </h2>

      {/* Search */}
      <div className="flex flex-col gap-1">
        <label htmlFor="search-input" className="text-sm font-medium text-gray-700">
          Search
        </label>
        <input
          id="search-input"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search universities..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Country */}
      <div className="flex flex-col gap-1">
        <label htmlFor="country-select" className="text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          id="country-select"
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Specialty */}
      <div className="flex flex-col gap-1">
        <label htmlFor="specialty-select" className="text-sm font-medium text-gray-700">
          Specialty
        </label>
        <select
          id="specialty-select"
          value={specialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">All Specialties</option>
          {specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="filter-panel-mobile"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          {mobileOpen ? 'Hide Filters' : 'Show Filters'}
          {hasActiveFilters && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold">
              !
            </span>
          )}
        </button>

        {mobileOpen && (
          <div
            id="filter-panel-mobile"
            className="mt-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            {panelContent}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          {panelContent}
        </div>
      </aside>
    </>
  );
}
