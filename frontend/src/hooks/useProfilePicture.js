import { useEffect, useState } from "react";
import { getProfilePictureUrl } from "../services/profileApi";

export function useProfilePicture(user) {
  const [pictureUrl, setPictureUrl] = useState(null);
  const pictureVersion = user?.profile_picture_updated_at || "none";

  useEffect(() => {
    let active = true;
    let objectUrl = null;

    const loadPicture = async () => {
      if (!user?.has_profile_picture) {
        setPictureUrl(null);
        return;
      }
      try {
        objectUrl = await getProfilePictureUrl();
        if (active) setPictureUrl(objectUrl);
      } catch (error) {
        if (active) setPictureUrl(null);
      }
    };

    loadPicture();
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [user?.has_profile_picture, pictureVersion]);

  return pictureUrl;
}
