import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MovieList } from "../pages/MovieList";
import { ProfileLayout } from "../components/profile/ProfileLayout";
import { RequireAuthentication } from "../components/RequireAuthentication";

const lazyPage = (importPage, exportName) =>
  lazy(() => importPage().then((module) => ({ default: module[exportName] })));

const MovieDetail = lazyPage(() => import("../pages/MovieDetail"), "MovieDetail");
const Search = lazyPage(() => import("../pages/Search"), "Search");
const Contact = lazyPage(() => import("../pages/Contact"), "Contact");
const Favorites = lazyPage(() => import("../pages/Favorites"), "Favorites");
const ProfileHome = lazyPage(() => import("../pages/profile/ProfileHome"), "ProfileHome");
const UpdateName = lazyPage(() => import("../pages/profile/UpdateName"), "UpdateName");
const ChangePassword = lazyPage(() => import("../pages/profile/ChangePassword"), "ChangePassword");
const UpdateProfilePicture = lazyPage(
  () => import("../pages/profile/UpdateProfilePicture"),
  "UpdateProfilePicture",
);
const PageNotFound = lazyPage(() => import("../pages/PageNotFound"), "PageNotFound");

const AuthPopupRoute = () => (
  <main className="min-h-[70vh]" aria-hidden="true" />
);

const RouteSkeleton = () => (
  <main className="mx-auto max-w-7xl px-4 py-8" aria-busy="true" aria-label="Loading page">
    <div className="animate-pulse space-y-5">
      <div className="h-10 w-2/3 max-w-md rounded bg-gray-300 dark:bg-gray-700" />
      <div className="h-5 w-full rounded bg-gray-200 dark:bg-gray-600" />
      <div className="h-5 w-5/6 rounded bg-gray-200 dark:bg-gray-600" />
    </div>
  </main>
);

export const AllRoutes = () => {
  return (
    <div className="dark:bg-darkbg">
      <Suspense fallback={<RouteSkeleton />}>
        <Routes>
          <Route path="" element={<MovieList apiPath="movie/now_playing" title="Home" />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="movies/popular" element={<MovieList apiPath="movie/popular" title="Popular" />} />
          <Route path="movies/top" element={<MovieList apiPath="movie/top_rated" title="Top Rated" />} />
          <Route path="movies/upcoming" element={<MovieList apiPath="movie/upcoming" title="Upcoming" />} />
          <Route path="search" element={<Search apiPath="search/movie" />} />
          <Route path="contact" element={<Contact />} />
          <Route path="account" element={<AuthPopupRoute />} />
          <Route path="login" element={<AuthPopupRoute />} />
          <Route path="signup" element={<AuthPopupRoute />} />
          <Route path="profile" element={<RequireAuthentication><ProfileLayout /></RequireAuthentication>}>
            <Route index element={<ProfileHome />} />
            <Route path="picture" element={<UpdateProfilePicture />} />
            <Route path="name" element={<UpdateName />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
          <Route path="favorites" element={<RequireAuthentication><Favorites /></RequireAuthentication>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};
