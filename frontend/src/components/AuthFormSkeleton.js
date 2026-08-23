export const AuthFormSkeleton = () => (
  <div className="animate-pulse" role="status" aria-live="polite" aria-label="Loading account form">
    <span className="sr-only">Loading...</span>
    <div className="mb-3 h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
    <div className="mb-5 h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
    <div className="mb-3 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
    <div className="mb-5 h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
    <div className="mb-6 h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
    <div className="h-12 w-full rounded-lg bg-blue-200 dark:bg-blue-900/60" />
  </div>
);
