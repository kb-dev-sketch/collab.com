import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";

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
  FiMenu,
  FiX,
} from "react-icons/fi";

function Sidebar() {
  const { user, loading, logout } = useContext(AuthContext);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

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

  const profilePath =
    user?.role === "creator"
      ? "/creator-profile-view"
      : "/brand-profile-view";

  const navItems = [
    {
      label: "Dashboard",
      path: dashboardPath,
      icon: FiGrid,
    },
    {
      label: "Campaigns",
      path: "/campaigns",
      icon: FiBriefcase,
    },
    {
      label: "Proposals",
      path: proposalPath,
      icon: FiFileText,
    },
    {
      label: "Messages",
      path: "/messages",
      icon: FiMessageSquare,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: FiBell,
    },
    {
      label: "Profile",
      path: profilePath,
      icon: FiUser,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: FiSettings,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-sm lg:flex">
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
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold uppercase text-white">
              {user?.username?.charAt(0) || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">
                {user?.username || "User"}
              </p>

              <p className="text-xs capitalize text-blue-600">
                {user?.role || "User"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="flex-1 overflow-y-auto">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      active
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={20} />

                    <span className="flex-1">
                      {item.label}
                    </span>

                    <FiChevronRight
                      size={16}
                      className={`transition ${
                        active
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ================= LOGOUT ================= */}

        <div className="mt-6 border-t border-slate-200 pt-4">
          <button
            type="button"
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

      {/* =====================================================
          MOBILE TOP BAR
      ====================================================== */}

      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
        {/* Menu button */}

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100"
          aria-label="Open navigation"
        >
          <FiMenu size={23} />
        </button>

        {/* Logo */}

        <Link
          to={dashboardPath}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-extrabold text-white">
            CC
          </div>

          <span className="text-base font-extrabold tracking-tight text-slate-900">
            CollabConnect
          </span>
        </Link>

        {/* User avatar */}

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold uppercase text-white">
          {user?.username?.charAt(0) || "U"}
        </div>
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 lg:hidden"
          onClick={closeMobileMenu}
        >
          <aside
            className="relative h-full w-[82%] max-w-xs bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Drawer Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <Link
                to={dashboardPath}
                onClick={closeMobileMenu}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white">
                  CC
                </div>

                <div>
                  <h2 className="font-extrabold text-slate-900">
                    CollabConnect
                  </h2>

                  <p className="text-[10px] text-slate-400">
                    Influencer × Brand
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close navigation"
              >
                <FiX size={21} />
              </button>
            </div>

            {/* Mobile User */}

            <div className="mx-4 mt-5 rounded-2xl bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                Signed in as
              </p>

              <div className="mt-2 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold uppercase text-white">
                  {user?.username?.charAt(0) || "U"}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {user?.username || "User"}
                  </p>

                  <p className="text-xs capitalize text-blue-600">
                    {user?.role || "User"}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}

            <nav className="mt-6 px-4 pb-24">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
              </p>

              <ul className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <li key={item.label}>
                      <Link
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                          active
                            ? "bg-blue-50 font-semibold text-blue-600"
                            : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        <Icon size={20} />

                        <span className="flex-1">
                          {item.label}
                        </span>

                        <FiChevronRight size={16} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Logout */}

            <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-4">
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50"
              >
                <FiLogOut size={20} />

                <span className="font-medium">
                  Logout
                </span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;