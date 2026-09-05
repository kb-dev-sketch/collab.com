import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";
import { getCampaignById } from "../services/campaign";

import {
  FiArrowLeft,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiFileText,
  FiGlobe,
  FiLayers,
  FiSend,
  FiUsers,
  FiTarget,
  FiDollarSign,
} from "react-icons/fi";

function CampaignDetails() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const { user, loading: authLoading } = useContext(AuthContext);

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCampaignById(campaignId);

        console.log("Campaign Details:", response.data);

        setCampaign(response.data);
      } catch (error) {
        console.error("Campaign fetch error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load campaign"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  if (authLoading || loading) {
    return <Loader />;
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <main className="flex-1 p-5 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-4xl">

            <button
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
            >
              <FiArrowLeft size={16} />
              Back
            </button>

            <div className="rounded-3xl border border-red-100 bg-white p-8 shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <FiFileText size={24} />
              </div>

              <h2 className="mt-5 text-center text-xl font-bold text-slate-900">
                Unable to load campaign
              </h2>

              <p className="mt-2 text-center text-sm text-red-500">
                {error}
              </p>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <FiArrowLeft size={17} />
                  Go Back
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!campaign) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <main className="flex-1 p-5 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-4xl">

            <button
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
            >
              <FiArrowLeft size={16} />
              Back
            </button>

            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <FiBriefcase size={27} />
              </div>

              <h2 className="mt-6 text-xl font-bold text-slate-900">
                Campaign not found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                This campaign may have been removed or is no longer available.
              </p>

            </div>
          </div>
        </main>
      </div>
    );
  }

  const formattedStartDate = campaign.startDate
    ? new Date(campaign.startDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  const formattedEndDate = campaign.endDate
    ? new Date(campaign.endDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  const isCreator = user?.role === "creator";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10">

          {/* ================= BACK ================= */}

          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:-translate-x-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <FiArrowLeft size={16} />
            Back
          </button>


          {/* ================= HERO ================= */}

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            {/* Background decoration */}
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative">

              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                {/* Campaign heading */}
                <div className="max-w-3xl">

                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                    <FiBriefcase size={14} />
                    Campaign Details
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    {campaign.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-3">

                    <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-blue-50 backdrop-blur-sm">
                      <FiUsers size={15} />
                      {campaign.brandId?.companyName || "Brand"}
                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${
                        campaign.status === "Active"
                          ? "bg-white text-blue-700"
                          : campaign.status === "Completed"
                          ? "bg-indigo-100 text-indigo-700"
                          : campaign.status === "Cancelled"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {campaign.status}
                    </span>

                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                    {campaign.description}
                  </p>

                </div>


                {/* Budget */}
                <div className="w-full max-w-xs rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <FiDollarSign size={17} />
                    Campaign Budget
                  </div>

                  <p className="mt-2 text-3xl font-bold">
                    ₹{campaign.budget || 0}
                  </p>

                  <p className="mt-1 text-xs text-blue-200">
                    Total campaign budget
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* ================= MAIN CONTENT ================= */}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">

            {/* ================= LEFT ================= */}

            <div className="space-y-6">

              {/* About */}
              <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeading
                  icon={<FiFileText size={18} />}
                  title="About Campaign"
                />

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {campaign.description || "No description available."}
                </p>

              </section>


              {/* Requirements */}
              <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeading
                  icon={<FiTarget size={18} />}
                  title="Requirements"
                />

                <div className="mt-5 rounded-2xl bg-blue-50/60 p-5">

                  <p className="text-sm leading-7 text-slate-600">
                    {campaign.requirements ||
                      "No specific requirements provided."}
                  </p>

                </div>

              </section>


              {/* Deliverables */}
              <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeading
                  icon={<FiCheckCircle size={18} />}
                  title="Deliverables"
                />

                <div className="mt-5 rounded-2xl bg-indigo-50/60 p-5">

                  <p className="text-sm leading-7 text-slate-600">
                    {campaign.deliverables ||
                      "No specific deliverables provided."}
                  </p>

                </div>

              </section>


              {/* Niches */}
              <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeading
                  icon={<FiLayers size={18} />}
                  title="Target Niches"
                />

                {campaign.niches?.length > 0 ? (

                  <div className="mt-5 flex flex-wrap gap-2">

                    {campaign.niches.map((niche) => (
                      <span
                        key={niche}
                        className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                      >
                        {niche}
                      </span>
                    ))}

                  </div>

                ) : (

                  <p className="mt-4 text-sm text-slate-400">
                    No niches specified.
                  </p>

                )}

              </section>


              {/* Platforms */}
              <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeading
                  icon={<FiGlobe size={18} />}
                  title="Platforms"
                />

                {campaign.platforms?.length > 0 ? (

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    {campaign.platforms.map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4"
                      >

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                          <FiGlobe size={16} />
                        </div>

                        <span className="font-semibold text-slate-800">
                          {platform}
                        </span>

                      </div>
                    ))}

                  </div>

                ) : (

                  <p className="mt-4 text-sm text-slate-400">
                    No platforms specified.
                  </p>

                )}

              </section>

            </div>


            {/* ================= RIGHT SIDEBAR ================= */}

            <aside className="space-y-6">

              {/* Campaign Summary */}
              <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-bold text-slate-900">
                  Campaign Summary
                </h2>

                <div className="mt-5 space-y-4">

                  <InfoRow
                    icon={<FiDollarSign />}
                    label="Budget"
                    value={`₹${campaign.budget || 0}`}
                    highlight
                  />

                  <InfoRow
                    icon={<FiCalendar />}
                    label="Start Date"
                    value={formattedStartDate}
                  />

                  <InfoRow
                    icon={<FiCalendar />}
                    label="End Date"
                    value={formattedEndDate}
                  />

                  <InfoRow
                    icon={<FiClock />}
                    label="Status"
                    value={campaign.status}
                  />

                </div>

              </section>


              {/* Timeline */}
              <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-bold text-slate-900">
                  Campaign Timeline
                </h2>

                <div className="mt-6">

                  <TimelineItem
                    icon={<FiCheckCircle size={15} />}
                    title="Campaign Start"
                    value={formattedStartDate}
                    active
                  />

                  <TimelineItem
                    icon={<FiClock size={15} />}
                    title="Campaign End"
                    value={formattedEndDate}
                    last
                  />

                </div>

              </section>

            </aside>

          </div>


          {/* ================= ACTIONS ================= */}

          <section className="mt-6 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

            {isCreator ? (

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Creator Opportunity
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Interested in this campaign?
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Submit your proposal and let the brand know how you can
                    contribute.
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(`/campaign/${campaign._id}/proposal`)
                  }
                  disabled={campaign.status !== "Active"}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition ${
                    campaign.status === "Active"
                      ? "bg-blue-600 shadow-blue-600/20 hover:bg-blue-700"
                      : "cursor-not-allowed bg-slate-300 shadow-none"
                  }`}
                >
                  <FiSend size={17} />
                  {campaign.status === "Active"
                    ? "Send Proposal"
                    : "Campaign Closed"}
                </button>

              </div>

            ) : (

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Campaign Management
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Manage your campaign
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Review creator proposals or update your campaign details.
                  </p>

                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                  <button
                    onClick={() =>
                      navigate(`/campaign/${campaign._id}/proposals`)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    <FiUsers size={17} />
                    View Proposals
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/campaign/${campaign._id}/edit`)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    <FiEdit3 size={17} />
                    Edit Campaign
                  </button>

                </div>

              </div>

            )}

          </section>


          {/* ================= BOTTOM CTA ================= */}

          <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-medium text-blue-100">
                  CollabConnect
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  Great campaigns start with great collaborations.
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  Find the right opportunity and build meaningful partnerships.
                </p>

              </div>

              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <FiArrowLeft size={17} />
                Back
              </button>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}


/* ================= SECTION HEADING ================= */

function SectionHeading({ icon, title }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h2 className="text-xl font-bold text-slate-900">
        {title}
      </h2>

    </div>
  );
}


/* ================= INFO ROW ================= */

function InfoRow({ icon, label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

        <span className="text-sm text-slate-500">
          {label}
        </span>

      </div>

      <span
        className={`text-right text-sm font-semibold ${
          highlight ? "text-blue-700" : "text-slate-800"
        }`}
      >
        {value}
      </span>

    </div>
  );
}


/* ================= TIMELINE ================= */

function TimelineItem({ icon, title, value, active = false, last = false }) {
  return (
    <div className="relative flex gap-3">

      {!last && (
        <div className="absolute left-[15px] top-8 h-12 w-px bg-blue-100" />
      )}

      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          active
            ? "bg-blue-600 text-white"
            : "bg-blue-50 text-blue-600"
        }`}
      >
        {icon}
      </div>

      <div className="pb-6">

        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {value}
        </p>

      </div>

    </div>
  );
}

export default CampaignDetails;