import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";
import { getAllCampaigns } from "../services/campaign";
import { getProposalBycampaignId } from "../services/proposal";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiPlus,
  FiUsers,
  FiTrendingUp,
  FiInbox,
} from "react-icons/fi";

function BrandProposals() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [campaigns, setCampaigns] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const campaignResponse = await getAllCampaigns();

        const campaignData = campaignResponse.data || [];

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
        console.error("Brand proposals error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load proposals."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (authLoading || loading) {
    return <Loader />;
  }

  const pendingProposals = proposals.filter(
    (proposal) => proposal.status === "pending"
  );

  const acceptedProposals = proposals.filter(
    (proposal) => proposal.status === "accepted"
  );

  const rejectedProposals = proposals.filter(
    (proposal) => proposal.status === "rejected"
  );

  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Active"
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10">

          {/* ================================================= */}
          {/* HERO */}
          {/* ================================================= */}

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              {/* Hero text */}
              <div className="max-w-3xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                  <FiFileText size={14} />
                  Proposal Management
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Creator Proposals
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                  Review creator applications, compare proposals, and
                  choose the right talent for your campaigns.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                    <p className="text-xs text-blue-100">
                      Campaigns
                    </p>

                    <p className="mt-0.5 text-lg font-bold">
                      {campaigns.length}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                    <p className="text-xs text-blue-100">
                      Active
                    </p>

                    <p className="mt-0.5 text-lg font-bold">
                      {activeCampaigns.length}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                    <p className="text-xs text-blue-100">
                      Proposals
                    </p>

                    <p className="mt-0.5 text-lg font-bold">
                      {proposals.length}
                    </p>
                  </div>

                </div>

              </div>


              {/* Hero action */}
              <div className="w-full max-w-xs">

                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-700 shadow-md">
                    <FiUsers size={21} />
                  </div>

                  <h3 className="mt-4 text-lg font-bold">
                    Looking for creators?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-blue-100">
                    Launch a new campaign and start receiving proposals
                    from creators.
                  </p>

                  <button
                    onClick={() => navigate("/CreateCampaign")}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    <FiPlus size={17} />
                    Create Campaign
                  </button>

                </div>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500">
                  <FiFileText size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-red-800">
                    Unable to load proposals
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-red-600">
                    {error}
                  </p>
                </div>

              </div>

            </div>
          )}


          {/* ================================================= */}
          {/* STATS */}
          {/* ================================================= */}

          <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              icon={<FiInbox size={21} />}
              title="Total Proposals"
              value={proposals.length}
              description="All creator applications"
            />

            <StatCard
              icon={<FiClock size={21} />}
              title="Pending"
              value={pendingProposals.length}
              description="Waiting for your review"
            />

            <StatCard
              icon={<FiCheckCircle size={21} />}
              title="Accepted"
              value={acceptedProposals.length}
              description="Selected creators"
            />

            <StatCard
              icon={<FiTrendingUp size={21} />}
              title="Rejected"
              value={rejectedProposals.length}
              description="Not selected"
            />

          </section>


          {/* ================================================= */}
          {/* SECTION HEADER */}
          {/* ================================================= */}

          <section className="mt-10">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Applications
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Proposals by Campaign
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a campaign to review its creator applications.
                </p>

              </div>

              <div className="hidden items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm sm:flex">
                <FiFileText
                  size={16}
                  className="text-blue-600"
                />

                {proposals.length} total proposals
              </div>

            </div>


            {/* ================================================= */}
            {/* EMPTY STATE */}
            {/* ================================================= */}

            {campaigns.length === 0 ? (

              <div className="relative mt-6 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 px-6 py-16 text-center shadow-sm">

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50" />

                <div className="relative">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <FiBriefcase size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    No campaigns yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Create your first campaign to start receiving
                    proposals from creators.
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

              /* ================================================= */
              /* CAMPAIGN CARDS */
              /* ================================================= */

              <div className="mt-6 grid gap-5 lg:grid-cols-2">

                {campaigns.map((campaign) => {

                  const campaignProposals = proposals.filter(
                    (proposal) =>
                      proposal.campaignId?._id === campaign._id ||
                      proposal.campaignId === campaign._id
                  );

                  const pendingForCampaign =
                    campaignProposals.filter(
                      (proposal) =>
                        proposal.status === "pending"
                    ).length;

                  const acceptedForCampaign =
                    campaignProposals.filter(
                      (proposal) =>
                        proposal.status === "accepted"
                    ).length;

                  return (
                    <article
                      key={campaign._id}
                      className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                    >

                      {/* top gradient */}
                      <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />


                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 pt-1">

                        <div className="flex min-w-0 items-start gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                            <FiBriefcase size={21} />
                          </div>

                          <div className="min-w-0">

                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                              Campaign
                            </p>

                            <h3 className="mt-1 truncate text-xl font-bold text-slate-900">
                              {campaign.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                              {campaign.description}
                            </p>

                          </div>

                        </div>


                        {/* Status */}
                        <span
                          className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            campaign.status === "Active"
                              ? "border-blue-100 bg-blue-50 text-blue-700"
                              : campaign.status === "Completed"
                              ? "border-indigo-100 bg-indigo-50 text-indigo-700"
                              : campaign.status === "Cancelled"
                              ? "border-slate-200 bg-slate-100 text-slate-600"
                              : "border-blue-100 bg-blue-50 text-blue-600"
                          }`}
                        >
                          {campaign.status}
                        </span>

                      </div>


                      {/* Proposal Overview */}
                      <div className="mt-6 grid grid-cols-3 gap-3">

                        <MiniStat
                          label="Total"
                          value={campaignProposals.length}
                        />

                        <MiniStat
                          label="Pending"
                          value={pendingForCampaign}
                        />

                        <MiniStat
                          label="Accepted"
                          value={acceptedForCampaign}
                        />

                      </div>


                      {/* Bottom area */}
                      <div className="mt-6 flex items-center justify-between border-t border-blue-50 pt-5">

                        <div>

                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Campaign Budget
                          </p>

                          <p className="mt-1 text-lg font-bold text-blue-700">
                            ₹{campaign.budget || 0}
                          </p>

                        </div>


                        <button
                          onClick={() =>
                            navigate(
                              `/campaign/${campaign._id}/proposals`
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/15 transition hover:bg-blue-700"
                        >
                          Review
                          <FiArrowRight size={16} />
                        </button>

                      </div>

                    </article>
                  );
                })}

              </div>

            )}

          </section>


          {/* ================================================= */}
          {/* BOTTOM CTA */}
          {/* ================================================= */}

          <section className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">

            <div className="absolute -right-16 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <FiUsers size={22} />
                </div>

                <div>

                  <p className="text-sm font-medium text-blue-100">
                    Need more applicants?
                  </p>

                  <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                    Create another campaign
                  </h3>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-blue-100">
                    Publish a new opportunity and discover more creators
                    for your brand.
                  </p>

                </div>

              </div>

              <button
                onClick={() => navigate("/create-campaign")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
              >
                <FiPlus size={17} />
                Create Campaign
              </button>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}


/* ========================================================= */
/* STAT CARD */
/* ========================================================= */

function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40">

      <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50 transition group-hover:bg-blue-100" />

      <div className="relative flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-blue-600 p-3 text-white shadow-md shadow-blue-600/20">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}


/* ========================================================= */
/* MINI STAT */
/* ========================================================= */

function MiniStat({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-blue-50/60 p-3.5">

      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-blue-700">
        {value}
      </p>

    </div>
  );
}

export default BrandProposals;