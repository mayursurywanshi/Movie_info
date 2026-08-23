import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";
import { useSearchParams } from "react-router-dom";
import { Card, CardSkeleton, Pagination } from "../components";


export const MovieList = ({apiPath, title}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const { data: movies, totalPages, loading } = useFetch(apiPath, "", page);
  useTitle(title);

  const changePage = (newPage) => {
    setSearchParams(newPage === 1 ? {} : { page: newPage });
  };

  return (
    <main>
      <section className="mx-auto max-w-7xl px-1 py-5 sm:px-3 sm:py-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">       
          {loading
            ? Array.from({ length: 8 }, (_, index) => <CardSkeleton key={index} />)
            : movies.map((movie, index) => <Card key={movie.id} movie={movie} priority={index === 0} />)}
        </div>
        {!loading && <Pagination currentPage={page} totalPages={totalPages} onPageChange={changePage} />}
      </section>
    </main>
  )
}
