import { NavLink, Link } from "react-router-dom";

export const ProfileSidebar = ({ collapsed, onToggle }) => {
  const linkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? "bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"}`;

  return (
    <aside className={`${collapsed ? "lg:w-20" : "lg:w-64"} min-h-[240px] w-full flex-none self-start rounded-2xl border border-gray-200 bg-white p-3 shadow-md transition-all dark:border-gray-700 dark:bg-gray-900`}>
      <div className="mb-3 flex items-center justify-between">
        {!collapsed && <span className="px-2 font-semibold text-gray-900 dark:text-white">Menu</span>}
        <button type="button" onClick={onToggle} aria-label="Toggle profile menu" className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">☰</button>
      </div>
      <nav className="space-y-2">
        <Link to="/" className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">{collapsed ? "⌂" : "Home"}</Link>
        <NavLink to="/profile/picture" className={linkClass}>{collapsed ? "◉" : "Update profile picture"}</NavLink>
        <NavLink to="/profile/name" className={linkClass}>{collapsed ? "Aa" : "Update name"}</NavLink>
      </nav>
    </aside>
  );
};
