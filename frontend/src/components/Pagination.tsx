interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build page number array with ellipsis logic
  function getPages(): (number | 'ellipsis')[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | 'ellipsis')[] = [];
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
    return pages;
  }

  const pages = getPages();

  const baseBtn =
    'inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1';
  const activeBtn = `${baseBtn} text-white` ;
  const inactiveBtn = `${baseBtn} border border-gray-300 text-gray-700 hover:bg-gray-50`;
  const disabledBtn = `${baseBtn} border border-gray-200 text-gray-400 cursor-not-allowed`;

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-8 pb-4"
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? disabledBtn : inactiveBtn}
        aria-label="Previous page"
        type="button"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${idx}`} className="px-1 text-gray-400 text-sm select-none">
              …
            </span>
          );
        }
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={isActive ? activeBtn : inactiveBtn}
            style={isActive ? { backgroundColor: '#1a2b4a' } : undefined}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            type="button"
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? disabledBtn : inactiveBtn}
        aria-label="Next page"
        type="button"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
