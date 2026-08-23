export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const firstPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstPage + index
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonClass = "min-w-[36px] rounded-lg border px-2.5 py-2 text-sm font-medium transition-colors sm:min-w-[40px] sm:px-3";

  return (
    <nav className="pagination flex flex-wrap items-center justify-center gap-1.5 py-6 sm:gap-2 sm:py-8" aria-label="Movie pages">
      <button className={`${buttonClass} border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200`} onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`${buttonClass} ${page === currentPage ? "border-blue-700 bg-blue-700 text-white" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"}`}
          onClick={() => changePage(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button className={`${buttonClass} border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200`} onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </nav>
  );
};
