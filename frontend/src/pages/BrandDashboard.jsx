import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { getAllCampaigns } from "../services/campaign";
import { getProposalBycampaignId } from "../services/proposal";

import { useNavigate } from "react-router-dom";

import {
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiPlus,
  FiUsers,
  FiFileText,
  FiUser,
  FiTrendingUp,
} from "react-icons/fi";

function BrandDashboard() {
  const { user, loading } = useContext(AuthContext);

  const [campaigns, setCampaigns] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [proposals, setProposals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getAllCampaigns();

        const campaignData = response.data || [];

        setCampaigns(campaignData);

        const proposalResponses = await Promise.all(
          campaignData.map((campaign) =>
            getProposalBycampaignId(campaign._id)
          )
        );

        const allProposals = proposalResponses.flatMap(
          (response) => response.data || []
        );

        setProposals(allProposals);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || loadingData) {
    return <Loader />;
  }

  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Active"
  );

  const completedCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Completed"
  );

  const pendingProposals = proposals.filter(
    (proposal) => proposal.status === "pending"
  );

  const acceptedProposals = proposals.filter(
    (proposal) => proposal.status === "accepted"
  );

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10">

          {/* ================= HEADER ================= */}
          <section className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Brand Dashboard
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Welcome, {user?.username} 👋
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage campaigns, discover creators, review proposals, and
                grow your brand partnerships.
              </p>
            </div>

            <button
              onClick={() => navigate("/create-campaign")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
            >
              <FiPlus size={18} />
              Create Campaign
            </button>

          </section>


          {/* ================= HERO ================= */}
          <section className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

              <div className="max-w-3xl">

                <div className="flex items-center gap-2 text-sm font-medium text-blue-100">
                  <FiTrendingUp size={17} />
                  Build your creator network
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  Find creators who bring your campaigns to life.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                  Launch campaigns, review creator proposals, and build
                  long-term partnerships from one simple workspace.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <button
                    onClick={() => navigate("/create-campaign")}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
                  >
                    <FiPlus size={17} />
                    Start Campaign
                  </button>

                  <button
                    onClick={() => navigate("/creators")}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <FiUsers size={17} />
                    Explore Creators
                  </button>

                </div>
              </div>

              {/* Profile card */}
              <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md lg:w-72">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-blue-700 shadow-md">
                    {user?.username?.charAt(0)?.toUpperCase() || "B"}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-blue-100">
                      Signed in as
                    </p>

                    <h3 className="mt-1 truncate text-lg font-bold">
                      {user?.username}
                    </h3>

                    <p className="text-sm text-blue-100">
                      Brand Account
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => navigate("/brand-profile")}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <FiUser size={16} />
                  Manage Profile
                </button>

              </div>

            </div>

          </section>


          {/* ================= STATS ================= */}
          <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* Active */}
            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50">

              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50" />

              <div className="relative flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Campaigns
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-slate-900">
                    {activeCampaigns.length}
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-600/20">
                  <FiBriefcase size={21} />
                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-blue-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Currently running
              </div>

            </div>


            {/* Pending */}
            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50">

              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50" />

              <div className="relative flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Pending Proposals
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-slate-900">
                    {pendingProposals.length}
                  </h3>
                </div>

                <div className="rounded-xl bg-indigo-600 p-3 text-white shadow-lg shadow-indigo-600/20">
                  <FiClock size={21} />
                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-indigo-600">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                Waiting for review
              </div>

            </div>


            {/* Collaborations */}
            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50">

              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50" />

              <div className="relative flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Ongoing Collaborations
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-slate-900">
                    {acceptedProposals.length}
                  </h3>
                </div>

                <div className="rounded-xl bg-sky-600 p-3 text-white shadow-lg shadow-sky-600/20">
                  <FiCheckCircle size={21} />
                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-sky-600">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                Accepted proposals
              </div>

            </div>


            {/* Completed */}
            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50">

              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50" />

              <div className="relative flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Completed Campaigns
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-slate-900">
                    {completedCampaigns.length}
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-700 p-3 text-white shadow-lg shadow-blue-700/20">
                  <FiCheckCircle size={21} />
                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
                Successfully completed
              </div>

            </div>

          </section>


          {/* ================= QUICK ACTIONS ================= */}
          <section className="mt-10">

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Workspace
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Jump directly to the things you use most.
              </p>
            </div>


            <div className="grid gap-5 md:grid-cols-3">

              {/* Create Campaign */}
              <button
                onClick={() => navigate("/create-campaign")}
                className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/60"
              >

                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50 transition group-hover:bg-blue-100" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                      <FiPlus size={21} />
                    </div>

                    <FiArrowRight
                      size={20}
                      className="text-slate-300 transition duration-200 group-hover:translate-x-1 group-hover:text-blue-600"
                    />

                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    Create Campaign
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Launch a new campaign and start finding creators.
                  </p>

                </div>

              </button>


              {/* Proposals */}
              <button
                onClick={() => navigate("/campaigns")}
                className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/60"
              >

                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50 transition group-hover:bg-blue-100" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                      <FiFileText size={21} />
                    </div>

                    <FiArrowRight
                      size={20}
                      className="text-slate-300 transition duration-200 group-hover:translate-x-1 group-hover:text-blue-600"
                    />

                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    View Proposals
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Review creator proposals and manage applications.
                  </p>

                </div>

              </button>


              {/* Find Creators */}
              <button
                onClick={() => navigate("/creators")}
                className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/60"
              >

                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50 transition group-hover:bg-blue-100" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                      <FiUsers size={21} />
                    </div>

                    <FiArrowRight
                      size={20}
                      className="text-slate-300 transition duration-200 group-hover:translate-x-1 group-hover:text-blue-600"
                    />

                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    Find Creators
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Discover creators that match your campaign needs.
                  </p>

                </div>

              </button>

            </div>

          </section>


          {/* ================= RECENT CAMPAIGNS ================= */}
          <section className="mt-10">

            <div className="mb-5 flex items-end justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Campaigns
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Recent Campaigns
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Keep an eye on your latest campaign activity.
                </p>
              </div>

              {campaigns.length > 0 && (
                <button
                  onClick={() => navigate("/campaigns")}
                  className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 sm:flex"
                >
                  View all
                  <FiArrowRight size={16} />
                </button>
              )}

            </div>


            {campaigns.length === 0 ? (

              /* Empty State */
              <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 px-6 py-14 text-center shadow-sm">

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50" />

                <div className="relative">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <FiBriefcase size={27} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    No campaigns yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Create your first campaign and start connecting with
                    talented creators.
                  </p>

                  <button
                    onClick={() => navigate("/create-campaign")}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    <FiPlus size={18} />
                    Create Your First Campaign
                  </button>

                </div>

              </div>

            ) : (

              <div className="grid gap-5 lg:grid-cols-2">

                {campaigns.slice(0, 4).map((campaign) => {

                  const campaignProposals = proposals.filter(
                    (proposal) =>
                      proposal.campaignId?._id === campaign._id ||
                      proposal.campaignId === campaign._id
                  );

                  return (
                    <div
                      key={campaign._id}
                      className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                    >

                      {/* Top */}
                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <div className="mb-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-600" />

                            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                              Campaign
                            </span>
                          </div>

                          <h3 className="truncate text-xl font-bold text-slate-900">
                            {campaign.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                            {campaign.description}
                          </p>

                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            campaign.status === "Active"
                              ? "bg-blue-100 text-blue-700"
                              : campaign.status === "Completed"
                              ? "bg-indigo-50 text-indigo-700"
                              : campaign.status === "Cancelled"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {campaign.status}
                        </span>

                      </div>


                      {/* Details */}
                      <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-blue-50/60 p-4">

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Budget
                          </p>

                          <p className="mt-1 text-lg font-bold text-blue-700">
                            ₹{campaign.budget || 0}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Proposals
                          </p>

                          <p className="mt-1 text-lg font-bold text-blue-700">
                            {campaignProposals.length}
                          </p>
                        </div>

                      </div>


                      {/* Manage */}
                      <button
                        onClick={() =>
                          navigate(`/campaign/${campaign._id}`)
                        }
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-600 hover:text-white"
                      >
                        Manage Campaign
                        <FiArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>

                    </div>
                  );
                })}

              </div>

            )}

          </section>


          {/* ================= BOTTOM CTA ================= */}
          <section className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">

            <div className="absolute -right-16 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <FiUsers size={22} />
                </div>

                <div>

                  <p className="text-sm font-medium text-blue-100">
                    Creator discovery
                  </p>

                  <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                    Ready to find your next creator?
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                    Explore creators, compare their profiles, and build
                    collaborations that fit your campaign.
                  </p>

                </div>

              </div>

              <button
                onClick={() => navigate("/creators")}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
              >
                Find Creators
                <FiArrowRight size={17} />
              </button>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

export default BrandDashboard;