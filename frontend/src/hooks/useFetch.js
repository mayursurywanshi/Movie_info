import { useState, useEffect } from "react";

export const useFetch = (apiPath, queryTerm="", page=1) => {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const params = new URLSearchParams({
      api_key: process.env.REACT_APP_API_KEY,
      page: String(page),
    });
    if (queryTerm) params.set("query", queryTerm);
    const url = `https://api.themoviedb.org/3/${apiPath}?${params.toString()}`;

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies(){
          setLoading(true);
          try {
            const response = await fetch(url, { signal: controller.signal });
            const json = await response.json();
            setData(json.results || []);
            setTotalPages(Math.min(json.total_pages || 1, 500));
          } catch (error) {
            if (error.name !== "AbortError") setData([]);
          } finally {
            if (!controller.signal.aborted) setLoading(false);
          }
        }
        fetchMovies();
        return () => controller.abort();
      }, [url])

  return { data, totalPages, loading }
}
