export const CardSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800" aria-hidden="true">
      <div className="aspect-[2/3] w-full animate-pulse bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
        <div className="mx-auto mt-5 h-9 w-28 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
