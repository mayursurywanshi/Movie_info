import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { FavoriteButton } from "../components";
import Backup from "../assets/images/backup.png"

export const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  
  //eslint-disable-next-line
  const pageTitle = useTitle(movie.title);

  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : Backup ;
  const imdbId = typeof movie.imdb_id === "string" ? movie.imdb_id.trim() : "";

  useEffect(() => {
    async function fetchMovie(){
      setLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=b80d59c33d6d57ed9c7e3713f91c188a`);
        const json = await response.json()
        setMovie(json);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [params.id]);

  if (loading) {
    return (
      <main aria-busy="true" aria-label="Loading movie details">
        <section className="grid animate-pulse gap-6 px-1 py-5 sm:px-4 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] lg:gap-10">
          <div className="mx-auto aspect-[2/3] w-full max-w-sm rounded-lg bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-full pt-3">
            <div className="h-10 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="mt-6 h-4 w-full rounded bg-gray-200 dark:bg-gray-600"></div>
            <div className="mt-3 h-4 w-11/12 rounded bg-gray-200 dark:bg-gray-600"></div>
            <div className="mt-3 h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-600"></div>
            <div className="mt-8 flex gap-3">
              <div className="h-10 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-10 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="mt-8 h-5 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>
            {[1, 2, 3, 4, 5].map((item) => <div key={item} className="mt-5 h-5 w-56 rounded bg-gray-200 dark:bg-gray-600"></div>)}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="grid gap-6 px-1 py-5 sm:px-4 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] lg:items-start lg:gap-10">
        <div className="mx-auto w-full max-w-sm">
          <img className="h-auto w-full rounded-lg shadow-md" src={image} alt={movie.title} width="500" height="750" loading="eager" fetchpriority="high" decoding="async" />
        </div>
        <div className="w-full min-w-0 text-left text-base text-gray-700 dark:text-white sm:text-lg">
          <div className="my-3 flex flex-col items-center gap-4 sm:flex-row sm:justify-between lg:items-start">
            <h1 className="text-center text-3xl font-bold sm:text-4xl lg:text-left">{movie.title}</h1>
            <FavoriteButton movie={movie} />
          </div>
          <p className="my-4 leading-relaxed">{movie.overview}</p>
            { movie.genres ? (
              <p className="my-7 flex flex-wrap gap-2">
              { movie.genres.map((genre) => (
                <span className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2" key={genre.id}>{genre.name}</span>
              )) }
            </p>
            ) : "" }
          
          <div className="flex items-center">
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <p className="ml-2 text-gray-900 dark:text-white">{movie.vote_average}</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <span className="text-gray-900 dark:text-white">{movie.vote_count} reviews</span>
          </div>

          <div className="mt-4 text-left">
            <p className="my-4">
              <span className="mr-2 font-bold">Runtime:</span>
              <span>{movie.runtime} min.</span>
            </p>

            <p className="my-4">
              <span className="mr-2 font-bold">Budget:</span>
              <span>{movie.budget}</span>
            </p>

            <p className="my-4">
              <span className="mr-2 font-bold">Revenue:</span>
              <span>{movie.revenue}</span>
            </p>

            <p className="my-4">
              <span className="mr-2 font-bold">Release Date:</span>
              <span>{movie.release_date}</span>
            </p>

            {imdbId && (
              <a href={`https://www.imdb.com/title/${imdbId}/videogallery/`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Trailer
              </a>
            )}
          </div>

        </div>
      </section>
    </main>
  )
}
