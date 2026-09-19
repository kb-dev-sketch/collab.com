import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiEdit3,
  FiShield,
  FiBell,
  FiLock,
  FiLogOut,
  FiMail,
  FiBriefcase,
  FiChevronRight,
  FiHelpCircle,
} from "react-icons/fi";

import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

function Settings() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("account");

  const isCreator = user?.role === "creator";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const tabs = [
    {
      id: "account",
      label: "Account",
      icon: FiUser,
    },
    {
      id: "profile",
      label: "Profile",
      icon: FiEdit3,
    },
    {
      id: "security",
      label: "Security",
      icon: FiShield,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: FiBell,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Page */}
      <main className="min-w-0 flex-1">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
            <p className="text-sm font-semibold text-blue-600">
              Account Settings
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Manage your account, profile, security and notification
              preferences.
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
            {/* Settings Navigation */}
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className="px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Preferences
                </p>
              </div>

              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon size={18} />

                      <span className="flex-1 text-left">
                        {tab.label}
                      </span>

                      <FiChevronRight
                        size={15}
                        className={`transition ${
                          active
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="my-3 border-t border-slate-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </aside>

            {/* Settings Content */}
            <section className="min-w-0">
              {/* ================= ACCOUNT ================= */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  {/* User Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-600/20">
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold text-slate-900">
                            {user?.username || "User"}
                          </h2>

                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                            Active
                          </span>
                        </div>

                        <div className="mt-2 flex flex-col gap-1 text-sm text-slate-500">
                          <span className="flex items-center gap-2">
                            <FiMail size={15} />
                            {user?.email || "Email not available"}
                          </span>

                          <span className="flex items-center gap-2 capitalize">
                            <FiBriefcase size={15} />
                            {user?.role || "User"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                      <h2 className="font-bold text-slate-900">
                        Account information
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Basic information associated with your account.
                      </p>
                    </div>

                    <div className="divide-y divide-slate-100">
                      <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Username
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Your CollabConnect username
                          </p>
                        </div>

                        <p className="font-medium text-slate-700">
                          {user?.username || "Not available"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Email address
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Your registered email
                          </p>
                        </div>

                        <p className="max-w-full truncate font-medium text-slate-700 sm:max-w-[300px]">
                          {user?.email || "Not available"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Account type
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Your role on CollabConnect
                          </p>
                        </div>

                        <span className="w-fit rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold capitalize text-blue-600">
                          {user?.role || "User"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Account status
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Current account availability
                          </p>
                        </div>

                        <span className="flex w-fit items-center gap-2 text-sm font-semibold text-emerald-600">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile CTA */}
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          Complete your profile
                        </h3>

                        <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                          {isCreator
                            ? "Keep your creator profile updated so brands can discover you."
                            : "Keep your brand profile updated so creators can understand your business."}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab("profile")}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                      >
                        <FiEdit3 size={16} />
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= PROFILE ================= */}
              {activeTab === "profile" && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
                    <h2 className="text-xl font-bold text-slate-900">
                      Profile
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage the information visible on your profile.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <FiEdit3 size={20} />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">
                            Edit your {isCreator ? "creator" : "brand"} profile
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            Update your profile details, social links,
                            description and other information.
                          </p>
                        </div>

                        <Link
                          to={
                            isCreator
                              ? "/creator-profile"
                              : "/brand-profile"
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Open Profile
                          <FiChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= SECURITY ================= */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
                      <h2 className="text-xl font-bold text-slate-900">
                        Security
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Manage your account security.
                      </p>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col gap-5 rounded-xl border border-slate-200 p-5 sm:flex-row sm:items-center">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <FiLock size={20} />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">
                            Password
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Change your password to keep your account secure.
                          </p>
                        </div>

                        <button
                          type="button"
                          className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
                    <div className="flex gap-4">
                      <FiShield
                        size={20}
                        className="mt-0.5 shrink-0 text-amber-600"
                      />

                      <div>
                        <h3 className="font-semibold text-amber-900">
                          Keep your account secure
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-amber-700">
                          Never share your password or authentication
                          credentials with anyone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= NOTIFICATIONS ================= */}
              {activeTab === "notifications" && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
                    <h2 className="text-xl font-bold text-slate-900">
                      Notifications
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage and view your CollabConnect notifications.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-5 rounded-xl border border-slate-200 p-5 sm:flex-row sm:items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FiBell size={20} />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">
                          Notification center
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          View proposal updates, accepted proposals,
                          rejected proposals and new messages.
                        </p>
                      </div>

                      <Link
                        to="/notifications"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Open Notifications
                        <FiChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Help */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <FiHelpCircle size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Need help?
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Explore CollabConnect or contact support.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;