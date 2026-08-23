import { Link } from "react-router-dom";
import Backup from "../assets/images/backup.png"
import { FavoriteButton } from "./FavoriteButton";

export const Card = ({movie, priority = false}) => {
  const {id, title, original_title, overview, poster_path} = movie;
  const movieTitle = title || original_title || "Untitled movie";
  const image = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : Backup ;

  return (
    <article className="movie-card flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="relative">
          <Link to={`/movie/${id}`} aria-label={`View details for ${movieTitle}`}>
              <img className="movie-card-image aspect-[2/3] w-full bg-gray-100 object-cover dark:bg-gray-900" src={image} alt={`${movieTitle} poster`} width="342" height="513" loading={priority ? "eager" : "lazy"} fetchpriority={priority ? "high" : "auto"} decoding="async" />
          </Link>
          <FavoriteButton movie={movie} compact />
        </div>
        <div className="flex flex-col flex-1 p-4">
            <Link to={`/movie/${id}`} aria-label={`View details for ${movieTitle}`}>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{movieTitle}</h5>
            </Link>
            <p className="movie-card-overview mb-4 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
            <Link to={`/movie/${id}`} aria-label={`View details for ${movieTitle}`} className="read-more-button mt-auto inline-flex self-center items-center rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700">
              Read More
            </Link>
        </div>
    </article>
  )
}
