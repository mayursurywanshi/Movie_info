import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileAvatar } from "./ProfileAvatar";

export const ProfileDropdown = ({ user, pictureUrl, onLogout }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const closeOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative ml-2" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" onClick={() => setOpen((current) => !current)} aria-haspopup="menu" aria-expanded={open} className="inline-flex h-[42px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:px-3">
        <ProfileAvatar user={user} pictureUrl={pictureUrl} className="h-8 w-8 text-sm" />
        <span className="hidden sm:inline">My Profile</span>
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-full z-40 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 text-left shadow-xl dark:border-gray-700 dark:bg-gray-900">
          <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{user.display_name || user.username}</p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <Link role="menuitem" to="/profile" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-300">Update Profile</Link>
          <Link role="menuitem" to="/favorites" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-300">Favorites</Link>
          <button role="menuitem" type="button" onClick={() => { setOpen(false); onLogout(); }} className="block w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30">Logout</button>
        </div>
      )}
    </div>
  );
};
