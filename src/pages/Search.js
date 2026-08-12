import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";
import { Card, CardSkeleton, Pagination } from "../components";

export const Search = ({apiPath}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryTerm = searchParams.get("q") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const { data: movies, totalPages, loading } = useFetch(apiPath, queryTerm, page);

  const changePage = (newPage) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newPage === 1) nextParams.delete("page");
    else nextParams.set("page", newPage);
    setSearchParams(nextParams);
  };

  useTitle(`Search result for ${queryTerm}`);

  return (
    <main>
      <section className="px-2 py-5 sm:py-7">
        <p className="break-words text-xl text-gray-700 dark:text-white sm:text-3xl">{loading ? `Searching for '${queryTerm}'...` : movies.length === 0 ? `No result found for '${queryTerm}'` : `Result for '${queryTerm}'`}</p>
      </section>
      <section className="mx-auto max-w-7xl px-1 py-5 sm:px-3 sm:py-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">       
          {loading
            ? Array.from({ length: 8 }, (_, index) => <CardSkeleton key={index} />)
            : movies.map((movie) => <Card key={movie.id} movie={movie} />)}
        </div>
        {!loading && <Pagination currentPage={page} totalPages={totalPages} onPageChange={changePage} />}
      </section>
    </main>
  )
}
