export const ProfileAvatar = ({ user, pictureUrl, className = "h-10 w-10 text-base" }) => {
  const initial =
    user?.display_name?.trim().charAt(0).toUpperCase() ||
    user?.username?.trim().charAt(0).toUpperCase() ||
    user?.email?.trim().charAt(0).toUpperCase() ||
    "U";

  if (pictureUrl) {
    return <img src={pictureUrl} alt={`${user?.display_name || user?.username} profile`} className={`${className} rounded-full object-cover`} />;
  }

  return (
    <span className={`${className} flex items-center justify-center rounded-full bg-blue-700 font-semibold text-white`} aria-label={`${user?.display_name || user?.username} profile initial`}>
      {initial}
    </span>
  );
};
