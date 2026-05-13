import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUniversities } from '../api/universities';
import FilterPanel from '../components/FilterPanel';
import UniversityRow from '../components/UniversityRow';
import Pagination from '../components/Pagination';
import { UniversityListSkeleton } from '../components/LoadingSkeleton';

const PAGE_LIMIT = 20;

export default function RankingsPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [page, setPage] = useState(1);

  const queryParams = { search, country, specialty, page, limit: PAGE_LIMIT };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['universities', queryParams],
    queryFn: () => fetchUniversities(queryParams),
    placeholderData: (prev) => prev,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleCountryChange = useCallback((value: string) => {
    setCountry(value);
    setPage(1);
  }, []);

  const handleSpecialtyChange = useCallback((value: string) => {
    setSpecialty(value);
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setCountry('');
    setSpecialty('');
    setPage(1);
  }, []);

  const universities = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.pages ?? 1;
  const totalCount = meta?.total ?? universities.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: '#1a1a2e' }}>
            World University Rankings
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
            Explore and compare top universities worldwide
          </p>
        </div>

        <div className="flex gap-6 items-start">
          {/* Sidebar / Filters */}
          <FilterPanel
            search={search}
            country={country}
            specialty={specialty}
            onSearchChange={handleSearchChange}
            onCountryChange={handleCountryChange}
            onSpecialtyChange={handleSpecialtyChange}
            onClearFilters={handleClearFilters}
          />

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Subtitle row */}
            <div className="mb-4">
              {!isLoading && (
                <p className="text-sm font-medium" style={{ color: '#6b7280' }}>
                  Showing{' '}
                  <span className="font-bold" style={{ color: '#1a1a2e' }}>
                    {totalCount}
                  </span>{' '}
                  {totalCount === 1 ? 'university' : 'universities'}
                </p>
              )}
            </div>

            {/* Card container */}
            <div
              className="rounded-xl border overflow-hidden bg-white shadow-sm"
              style={{ borderColor: '#e5e7eb' }}
            >
              {isLoading ? (
                <UniversityListSkeleton count={5} />
              ) : isError ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-sm font-medium text-red-600">
                    {error instanceof Error
                      ? error.message
                      : 'Failed to load universities. Please try again.'}
                  </p>
                </div>
              ) : universities.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <svg
                    className="mx-auto h-10 w-10 text-gray-300 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-500">
                    No universities match your filters.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-3 text-sm font-medium hover:underline focus:outline-none focus:underline"
                    style={{ color: '#1a2b4a' }}
                    type="button"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: '#e5e7eb' }}>
                  {universities.map((uni) => (
                    <UniversityRow key={uni.id} university={uni} />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {!isLoading && !isError && universities.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
