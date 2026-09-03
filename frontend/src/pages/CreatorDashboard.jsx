import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiFileText,
  FiBriefcase,
  FiCheckCircle,
  FiDollarSign,
  FiArrowRight,
  FiSearch,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";

function CreatorDashboard() {
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

          <p className="mt-3 text-sm font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6 lg:p-10">

          {/* ================= HEADER ================= */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-semibold text-blue-600">
                Creator Dashboard
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Hello, {user?.username} 👋
              </h1>

              <p className="mt-2 text-slate-500">
                Discover campaigns, manage proposals, and grow your
                collaborations.
              </p>
            </div>

            {/* Explore Campaigns */}
            <button
              onClick={() => navigate("/campaigns")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl"
            >
              <FiSearch size={19} />
              Explore Campaigns
            </button>
          </div>

          {/* ================= PROFILE BANNER ================= */}
          <div className="relative mt-8 overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-600/20 lg:p-8">

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>

            <div className="absolute -bottom-16 right-32 h-48 w-48 rounded-full bg-white/5"></div>

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-sm font-medium text-blue-100">
                  Grow your creator profile
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Make your profile stand out
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                  Keep your profile, niches, social links and portfolio
                  updated so brands can discover you more easily.
                </p>
              </div>

              <button
                onClick={() => navigate("/creator-profile")}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
              >
                <FiUser size={18} />
                Edit Profile
              </button>

            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* Active Proposals */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Proposals
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    12
                  </h2>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <FiFileText size={22} />
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-400">
                Proposals awaiting response
              </p>
            </div>

            {/* Ongoing Campaigns */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Ongoing Campaigns
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    5
                  </h2>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <FiBriefcase size={22} />
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-400">
                Active collaborations
              </p>
            </div>

            {/* Completed */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Completed Campaigns
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    3
                  </h2>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <FiCheckCircle size={22} />
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-400">
                Successfully delivered
              </p>
            </div>

            {/* Earnings */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Earnings
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    ₹45,000
                  </h2>
                </div>

                <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                  <FiDollarSign size={22} />
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-400">
                From completed collaborations
              </p>
            </div>
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div className="mt-10">

            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your creator activities quickly.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">

              {/* Explore Campaigns */}
              <button
                onClick={() => navigate("/campaigns")}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <FiSearch size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Explore Campaigns
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Find brands hiring creators
                    </p>
                  </div>

                </div>

                <FiArrowRight
                  size={20}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </button>

              {/* My Proposals */}
              <button
                onClick={() => navigate("/proposals")}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <FiFileText size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      My Proposals
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Track your submitted proposals
                    </p>
                  </div>

                </div>

                <FiArrowRight
                  size={20}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </button>

              {/* Messages */}
              <button
                onClick={() => navigate("/messages")}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                    <FiMessageSquare size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Messages
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Chat with brands
                    </p>
                  </div>

                </div>

                <FiArrowRight
                  size={20}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </button>

            </div>
          </div>

          {/* ================= RECOMMENDED CAMPAIGNS ================= */}
          <div className="mt-10">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recommended Campaigns
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Campaigns that may be a good fit for you.
                </p>
              </div>

              <button
                onClick={() => navigate("/campaigns")}
                className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
              >
                View all
                <FiArrowRight size={16} />
              </button>

            </div>

            {/* Campaign Card */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="text-xl font-bold text-slate-900">
                      TechGear Summer Blast
                    </h3>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Active
                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Create engaging technology content for TechGear's
                    summer product campaign and reach a tech-savvy audience.
                  </p>

                  {/* Campaign Information */}
                  <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Budget
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        ₹25,000 - ₹50,000
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Category
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        Technology
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Platform
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        Instagram
                      </p>
                    </div>

                  </div>

                </div>

                <button
                  onClick={() => navigate("/campaign/REPLACE_WITH_ID")}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  View Details
                  <FiArrowRight size={18} />
                </button>

              </div>

            </div>
          </div>

          {/* ================= BOTTOM CTA ================= */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:p-8">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <FiBriefcase size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Looking for your next collaboration?
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore active campaigns and find opportunities that
                    match your niche.
                  </p>
                </div>

              </div>

              <button
                onClick={() => navigate("/campaigns")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-100"
              >
                Browse Campaigns
                <FiArrowRight size={17} />
              </button>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default CreatorDashboard;