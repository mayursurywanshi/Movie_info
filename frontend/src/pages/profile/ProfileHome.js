import { useEffect, useState } from "react";
import { ProfileAvatar } from "../../components/profile/ProfileAvatar";
import { useProfilePicture } from "../../hooks/useProfilePicture";
import { getProfile } from "../../services/profileApi";
import { getAuthenticatedUser, updateStoredUser } from "../../services/authStorage";
import { useTitle } from "../../hooks/useTitle";

export const ProfileHome = () => {
  const [user, setUser] = useState(() => getAuthenticatedUser());
  const [error, setError] = useState("");
  const pictureUrl = useProfilePicture(user);
  useTitle("Profile");

  useEffect(() => {
    getProfile()
      .then((result) => {
        setUser(result.user);
        updateStoredUser(result.user);
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">Profile overview</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user?.display_name || user?.username}</h1>
      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
      <div className="mt-8 flex flex-col items-center rounded-2xl bg-gray-50 p-6 text-center dark:bg-gray-800 sm:flex-row sm:text-left">
        <ProfileAvatar user={user} pictureUrl={pictureUrl} className="h-24 w-24 text-3xl" />
        <div className="mt-5 sm:ml-6 sm:mt-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.display_name || user?.username}</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-300">@{user?.username}</p>
          <p className="mt-1 text-gray-600 dark:text-gray-300">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};
