import { Link } from "react-router-dom";
import Backup from "../assets/images/backup.png"

export const Card = ({movie}) => {
  const {id, original_title, overview, poster_path} = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Backup ;

  return (
    <article className="movie-card flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <Link to={`/movie/${id}`}>
            <img className="movie-card-image aspect-[2/3] w-full bg-gray-100 object-contain dark:bg-gray-900" src={image} alt={`${original_title} poster`} />
        </Link>
        <div className="flex flex-col flex-1 p-4">
            <Link to={`/movie/${id}`}>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{original_title}</h5>
            </Link>
            <p className="movie-card-overview mb-4 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
            <Link to={`/movie/${id}`} className="read-more-button mt-auto inline-flex self-center items-center rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700">
              Read More
            </Link>
        </div>
    </article>
  )
}
