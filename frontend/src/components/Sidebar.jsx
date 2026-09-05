import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader.jsx";

import {
  FiGrid,
  FiBriefcase,
  FiFileText,
  FiMessageSquare,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

function Sidebar() {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  const dashboardPath =
    user?.role === "creator"
      ? "/creator-dashboard"
      : "/brand-dashboard";

      const proposalPath =
      user?.role === "brand"
        ? "/brand-proposals"
        : "/creator-proposals";
  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-sm">

      {/* ================= LOGO ================= */}

      <div className="mb-8 px-2">
        <Link
          to={dashboardPath}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white shadow-md shadow-blue-100">
            CC
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              CollabConnect
            </h1>

            <p className="text-[11px] font-medium text-slate-400">
              Influencer × Brand
            </p>
          </div>
        </Link>
      </div>

      {/* ================= USER ROLE ================= */}

      <div className="mb-6 rounded-2xl bg-blue-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
          Signed in as
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">
              {user?.username}
            </p>

            <p className="text-xs capitalize text-blue-600">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="flex-1">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <ul className="space-y-1.5">

          {/* Dashboard */}

          <li>
            <Link
              to={dashboardPath}
              className="group flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-100"
            >
              <FiGrid size={20} />

              <span className="flex-1">
                Dashboard
              </span>

              <FiChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          </li>

          {/* Campaigns */}

          <li>
            <Link
              to="/campaigns"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <FiBriefcase size={20} />

              <span className="flex-1">
                Campaigns
              </span>

              <FiChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          </li>

          {/* Proposals */}

          <li>
            <Link
              to={proposalPath}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <FiFileText size={20} />

              <span className="flex-1">
                Proposals
              </span>

              <FiChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          </li>

          {/* Messages */}

          <li>
            <Link
              to="/messages"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <FiMessageSquare size={20} />

              <span className="flex-1">
                Messages
              </span>

              <FiChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          </li>

          {/* Notifications */}

          <li>
            <Link
              to="/notifications"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <FiBell size={20} />

              <span className="flex-1">
                Notifications
              </span>

              <FiChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          </li>

          {/* Profile */}

          <li>
            <Link
              to="/profile"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <FiUser size={20} />

              <span className="flex-1">
                Profile
              </span>

              <FiChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          </li>

          {/* Settings */}

          <li>
            <Link
              to="/settings"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <FiSettings size={20} />

              <span className="flex-1">
                Settings
              </span>

              <FiChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          </li>

        </ul>
      </nav>

      {/* ================= BOTTOM ================= */}

      <div className="mt-6 border-t border-slate-200 pt-4">

        <button
          onClick={logout}
          className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50"
        >
          <FiLogOut size={20} />

          <span className="font-medium">
            Logout
          </span>
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;