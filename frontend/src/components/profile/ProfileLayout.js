import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "./ProfileSidebar";

export const ProfileLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <main className="profile-page mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <ProfileSidebar collapsed={collapsed} onToggle={() => setCollapsed((current) => !current)} />
        <section className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <Outlet />
        </section>
      </div>
    </main>
  );
};
