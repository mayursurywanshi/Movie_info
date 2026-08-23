import { useEffect, useState } from "react";
import { ProfileAvatar } from "../../components/profile/ProfileAvatar";
import { useProfilePicture } from "../../hooks/useProfilePicture";
import { getAuthenticatedUser, updateStoredUser } from "../../services/authStorage";
import { uploadProfilePicture } from "../../services/profileApi";
import { useTitle } from "../../hooks/useTitle";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export const UpdateProfilePicture = () => {
  const [user, setUser] = useState(() => getAuthenticatedUser());
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const storedPictureUrl = useProfilePicture(user);
  useTitle("Update Profile Picture");

  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

  const selectFile = (event) => {
    const selectedFile = event.target.files?.[0] || null;
    setMessage("");
    setError("");
    if (!selectedFile) return setFile(null);
    if (!allowedTypes.has(selectedFile.type)) {
      event.target.value = "";
      return setError("Only JPEG, PNG and WebP images are allowed");
    }
    if (selectedFile.size > 1024 * 1024) {
      event.target.value = "";
      return setError("Profile picture must be 1 MB or smaller");
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return setError("Select a profile picture");
    setSubmitting(true);
    setError("");
    setMessage("");
    try {
      const result = await uploadProfilePicture(file);
      const updatedUser = {
        ...user,
        has_profile_picture: true,
        profile_picture_updated_at: result.picture.profile_picture_updated_at,
      };
      setUser(updatedUser);
      updateStoredUser(updatedUser);
      setMessage(result.message);
      setFile(null);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">Profile image</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Update profile picture</h1>
      <div className="mt-8 flex justify-center sm:justify-start">
        <ProfileAvatar user={user} pictureUrl={previewUrl || storedPictureUrl} className="h-32 w-32 text-4xl" />
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <label htmlFor="profile-picture" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Select a new picture</label>
        <input id="profile-picture" type="file" accept="image/jpeg,image/png,image/webp" onChange={selectFile} className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200" />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">JPEG, PNG or WebP. Maximum size: 1 MB.</p>
        {message && <p className="mt-4 text-sm text-green-700 dark:text-green-400" role="status">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
        <button type="submit" disabled={!file || submitting} className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Uploading..." : "Upload picture"}</button>
      </form>
    </div>
  );
};
