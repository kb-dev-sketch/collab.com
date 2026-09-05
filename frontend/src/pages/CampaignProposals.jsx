import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";
import { getProposalBycampaignId } from "../services/proposal";

import {
  FiArrowLeft,
  FiMapPin,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiClock,
  FiInstagram,
  FiYoutube,
  FiGlobe,
  FiCheck,
  FiX,
  FiFileText,
  FiStar,
  FiExternalLink,
  FiInbox,
} from "react-icons/fi";

function CampaignProposals() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const { loading: authLoading } = useContext(AuthContext);

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProposalBycampaignId(campaignId);

        console.log("Campaign proposals:", response.data);

        setProposals(response.data || []);
      } catch (error) {
        console.error("Proposal fetch error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load proposals. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [campaignId]);

  if (authLoading || loading) {
    return <Loader />;
  }

  const pendingCount = proposals.filter(
    (proposal) => proposal.status === "pending"
  ).length;

  const acceptedCount = proposals.filter(
    (proposal) => proposal.status === "accepted"
  ).length;

  const rejectedCount = proposals.filter(
    (proposal) => proposal.status === "rejected"
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "border-blue-100 bg-blue-50 text-blue-700";

      case "accepted":
        return "border-emerald-100 bg-emerald-50 text-emerald-700";

      case "rejected":
        return "border-red-100 bg-red-50 text-red-700";

      default:
        return "border-slate-200 bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10">

          {/* ================= HERO ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative">

              {/* Back */}
              <button
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur-sm transition hover:bg-white/20"
              >
                <FiArrowLeft size={16} />
                Back
              </button>

              <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

                <div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                    <FiFileText size={14} />
                    Creator Applications
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Campaign Proposals
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                    Review creator applications, compare their profiles,
                    and choose the best fit for your campaign.
                  </p>

                </div>

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-3">

                  <div className="min-w-[90px] rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                    <p className="text-xs text-blue-100">
                      Total
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {proposals.length}
                    </p>
                  </div>

                  <div className="min-w-[90px] rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                    <p className="text-xs text-blue-100">
                      Pending
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {pendingCount}
                    </p>
                  </div>

                  <div className="min-w-[90px] rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                    <p className="text-xs text-blue-100">
                      Accepted
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {acceptedCount}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </section>


          {/* ================= ERROR ================= */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-white p-2 text-red-500">
                  <FiX size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-red-800">
                    Unable to load proposals
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                </div>

              </div>

            </div>
          )}


          {/* ================= OVERVIEW ================= */}
          {proposals.length > 0 && (
            <section className="mt-8">

              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <FiInbox size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Total Applications
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {proposals.length}
                      </p>
                    </div>

                  </div>

                </div>


                <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                      <FiClock size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Awaiting Review
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {pendingCount}
                      </p>
                    </div>

                  </div>

                </div>


                <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                      <FiCheck size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Selected Creators
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {acceptedCount}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </section>
          )}


          {/* ================= EMPTY STATE ================= */}
          {proposals.length === 0 && !error && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <FiFileText size={28} />
              </div>

              <h2 className="mt-6 text-xl font-bold text-slate-900">
                No proposals yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Creators haven't applied to this campaign yet.
                New proposals will appear here when they apply.
              </p>

              <button
                onClick={() => navigate(-1)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <FiArrowLeft size={17} />
                Back to Campaign
              </button>

            </div>
          )}


          {/* ================= PROPOSALS ================= */}
          {proposals.length > 0 && (
            <section className="mt-8">

              <div className="mb-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Applications
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Creator Proposals
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Compare creators and choose the best proposal for your campaign.
                </p>

              </div>


              <div className="space-y-6">

                {proposals.map((proposal) => {

                  const creator = proposal.creatorId;

                  return (
                    <article
                      key={proposal._id}
                      className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40"
                    >

                      {/* Top blue line */}
                      <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

                      <div className="p-6 sm:p-8">

                        {/* ================= CREATOR HEADER ================= */}
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                          <div className="flex items-start gap-4">

                            {/* Avatar */}
                            <div className="relative">

                              {creator?.profileImage ? (
                                <img
                                  src={creator.profileImage}
                                  alt={creator.name || "Influencer"}
                                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-blue-50"
                                />
                              ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white ring-4 ring-blue-50">
                                  {creator?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "C"}
                                </div>
                              )}

                              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white">
                                <FiCheck size={12} />
                              </span>

                            </div>


                            <div className="min-w-0">

                              <div className="flex flex-wrap items-center gap-2">

                                <h3 className="text-xl font-bold text-slate-900">
                                  {creator?.name || "Influencer"}
                                </h3>

                                {proposal.status === "accepted" && (
                                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                    Selected
                                  </span>
                                )}

                              </div>

                              <p className="mt-1 text-sm font-medium text-blue-600">
                                @{creator?.username || "username"}
                              </p>

                              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">

                                <span className="inline-flex items-center gap-1.5">
                                  <FiMapPin size={14} />
                                  {creator?.city || "Location unavailable"}
                                </span>

                              </div>

                            </div>

                          </div>


                          {/* Status */}
                          <span
                            className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold capitalize ${getStatusStyle(
                              proposal.status
                            )}`}
                          >
                            {proposal.status}
                          </span>

                        </div>


                        {/* ================= CREATOR BIO ================= */}
                        <div className="mt-7 rounded-2xl bg-slate-50 p-5">

                          <div className="flex items-center gap-2">

                            <FiUserIcon />

                            <h4 className="font-semibold text-slate-900">
                              About the Creator
                            </h4>

                          </div>

                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {creator?.bio || "No bio available"}
                          </p>

                        </div>


                        {/* ================= NICHES ================= */}
                        <div className="mt-6">

                          <div className="flex items-center gap-2">
                            <FiStar className="text-blue-600" size={16} />

                            <h4 className="font-semibold text-slate-900">
                              Niches
                            </h4>
                          </div>

                          {creator?.niches?.length > 0 ? (

                            <div className="mt-3 flex flex-wrap gap-2">

                              {creator.niches.map((niche) => (
                                <span
                                  key={niche}
                                  className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                                >
                                  {niche}
                                </span>
                              ))}

                            </div>

                          ) : (
                            <p className="mt-2 text-sm text-slate-400">
                              No niches added
                            </p>
                          )}

                        </div>


                        {/* ================= CREATOR STATS ================= */}
                        <div className="mt-7 grid gap-4 sm:grid-cols-3">

                          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

                            <div className="flex items-center gap-2 text-blue-600">
                              <FiUsers size={17} />

                              <p className="text-xs font-semibold uppercase tracking-wide">
                                Followers
                              </p>
                            </div>

                            <p className="mt-2 text-2xl font-bold text-slate-900">
                              {creator?.followers || 0}
                            </p>

                          </div>


                          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

                            <div className="flex items-center gap-2 text-blue-600">
                              <FiTrendingUp size={17} />

                              <p className="text-xs font-semibold uppercase tracking-wide">
                                Engagement
                              </p>
                            </div>

                            <p className="mt-2 text-2xl font-bold text-slate-900">
                              {creator?.engagementRate || 0}%
                            </p>

                          </div>


                          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

                            <div className="flex items-center gap-2 text-blue-600">
                              <FiDollarSign size={17} />

                              <p className="text-xs font-semibold uppercase tracking-wide">
                                Price / Post
                              </p>
                            </div>

                            <p className="mt-2 text-2xl font-bold text-slate-900">
                              ₹{creator?.pricePerPost || 0}
                            </p>

                          </div>

                        </div>


                        {/* ================= SOCIALS ================= */}
                        <div className="mt-7">

                          <h4 className="font-semibold text-slate-900">
                            Social Presence
                          </h4>

                          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                            {/* Instagram */}
                            <SocialBox
                              icon={<FiInstagram size={17} />}
                              label="Instagram"
                              value={creator?.socials?.instagram}
                            />

                            {/* YouTube */}
                            <SocialBox
                              icon={<FiYoutube size={17} />}
                              label="YouTube"
                              value={creator?.socials?.youtube}
                            />

                            {/* Twitter */}
                            <SocialBox
                              icon={<FiUsers size={17} />}
                              label="Twitter"
                              value={creator?.socials?.twitter}
                            />

                            {/* Website */}
                            <SocialBox
                              icon={<FiGlobe size={17} />}
                              label="Website"
                              value={creator?.socials?.website}
                            />

                          </div>

                        </div>


                        {/* ================= PROPOSAL ================= */}
                        <div className="mt-7 border-t border-blue-100 pt-7">

                          <div className="flex items-center gap-2">
                            <FiFileText className="text-blue-600" size={17} />

                            <h4 className="font-semibold text-slate-900">
                              Proposal Details
                            </h4>
                          </div>


                          {/* Message */}
                          <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5">

                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                              Proposal Message
                            </p>

                            <p className="mt-3 text-sm leading-7 text-slate-700">
                              {proposal.message ||
                                "No proposal message provided."}
                            </p>

                          </div>


                          {/* Quote */}
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">

                            <div className="rounded-2xl border border-blue-100 bg-white p-5">

                              <div className="flex items-center gap-2 text-slate-400">
                                <FiDollarSign size={17} />

                                <p className="text-xs font-semibold uppercase tracking-wide">
                                  Creator Quote
                                </p>
                              </div>

                              <p className="mt-2 text-2xl font-bold text-blue-700">
                                ₹{proposal.quotedPrice || 0}
                              </p>

                            </div>


                            <div className="rounded-2xl border border-blue-100 bg-white p-5">

                              <div className="flex items-center gap-2 text-slate-400">
                                <FiClock size={17} />

                                <p className="text-xs font-semibold uppercase tracking-wide">
                                  Delivery Time
                                </p>
                              </div>

                              <p className="mt-2 text-2xl font-bold text-slate-900">
                                {proposal.deliveryDays || 0} days
                              </p>

                            </div>

                          </div>

                        </div>


                        {/* ================= ACTIONS ================= */}
                        {proposal.status === "pending" && (

                          <div className="mt-7 flex flex-col gap-3 border-t border-blue-100 pt-6 sm:flex-row sm:justify-end">

                            <button
                              type="button"
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              <FiX size={17} />
                              Reject
                            </button>

                            <button
                              type="button"
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                              <FiCheck size={17} />
                              Accept Proposal
                            </button>

                          </div>

                        )}

                      </div>

                    </article>
                  );
                })}

              </div>

            </section>
          )}

        </div>
      </main>
    </div>
  );
}


/* ================= SOCIAL BOX ================= */

function SocialBox({ icon, label, value }) {
  return (
    <div className="group flex items-center justify-between rounded-xl border border-blue-100 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/50">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs font-medium text-slate-400">
            {label}
          </p>

          <p className="truncate text-sm font-semibold text-slate-700">
            {value || "N/A"}
          </p>

        </div>

      </div>

      {value && (
        <FiExternalLink
          size={15}
          className="shrink-0 text-slate-300 transition group-hover:text-blue-600"
        />
      )}

    </div>
  );
}


/* Small user icon using existing icon library */
function FiUserIcon() {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
      <FiUsers size={15} />
    </div>
  );
}

export default CampaignProposals;