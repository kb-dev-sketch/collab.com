import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";
import {  myProposals } from "../services/proposal";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiSend,
  FiXCircle,
  FiRefreshCw,
} from "react-icons/fi";

function MyProposals() {
  const { user, loading: authLoading } =
    useContext(AuthContext);

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProposals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await myProposals();

        console.log("My Proposals:", response.data);

        setProposals(response.data || []);
      } catch (error) {
        console.error("My proposals error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your proposals"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyProposals();
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10">

          {/* ================= HERO ================= */}

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

              <div className="max-w-3xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                  <FiFileText size={14} />
                  Creator Workspace
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  My Proposals
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                  Track your submitted proposals, monitor responses,
                  and manage your creator opportunities.
                </p>

                {/* Mini Stats */}
                <div className="mt-6 flex flex-wrap gap-3">

                  <HeroStat
                    label="Total"
                    value={proposals.length}
                  />

                  <HeroStat
                    label="Pending"
                    value={pendingProposals.length}
                  />

                  <HeroStat
                    label="Accepted"
                    value={acceptedProposals.length}
                  />

                </div>

              </div>

              {/* CTA */}
              <button
                onClick={() => navigate("/campaigns")}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-md transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <FiSend size={17} />
                Find Campaigns
              </button>

            </div>

          </section>


          {/* ================= ERROR ================= */}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="font-semibold text-red-800">
                    Unable to load proposals
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>

                </div>

                <button
                  onClick={() =>
                    window.location.reload()
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-100"
                >
                  <FiRefreshCw size={15} />
                  Try Again
                </button>

              </div>

            </div>
          )}


          {/* ================= STATS ================= */}

          <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              icon={<FiFileText size={21} />}
              title="Total Proposals"
              value={proposals.length}
              description="All submitted proposals"
            />

            <StatCard
              icon={<FiClock size={21} />}
              title="Pending"
              value={pendingProposals.length}
              description="Waiting for response"
            />

            <StatCard
              icon={<FiCheckCircle size={21} />}
              title="Accepted"
              value={acceptedProposals.length}
              description="Successful applications"
            />

            <StatCard
              icon={<FiXCircle size={21} />}
              title="Rejected"
              value={rejectedProposals.length}
              description="Not selected"
            />

          </section>


          {/* ================= EMPTY STATE ================= */}

          {!error && proposals.length === 0 && (
            <section className="relative mt-10 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 px-6 py-16 text-center shadow-sm">

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50" />

              <div className="relative">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <FiSend size={27} />
                </div>

                <h2 className="mt-6 text-xl font-bold text-slate-900">
                  No proposals yet
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  You haven't applied to any campaigns yet.
                  Explore active campaigns and send your first proposal.
                </p>

                <button
                  onClick={() => navigate("/campaigns")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Explore Campaigns
                  <FiArrowRight size={17} />
                </button>

              </div>

            </section>
          )}


          {/* ================= PROPOSAL LIST ================= */}

          {proposals.length > 0 && (
            <section className="mt-10">

              <div className="mb-6">

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Applications
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Submitted Proposals
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review the proposals you've sent to brands.
                </p>

              </div>


              <div className="space-y-5">

                {proposals.map((proposal) => {

                  const campaign = proposal.campaignId;

                  return (
                    <article
                      key={proposal._id}
                      className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40"
                    >

                      {/* Blue top border */}
                      <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

                      <div className="p-6 sm:p-7">

                        {/* ================= HEADER ================= */}

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                          <div className="flex min-w-0 items-start gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                              <FiBriefcase size={21} />
                            </div>

                            <div className="min-w-0">

                              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                                Campaign
                              </p>

                              <h3 className="mt-1 truncate text-xl font-bold text-slate-900">
                                {campaign?.title ||
                                  "Campaign"}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                {campaign?.brandId?.companyName ||
                                  "Brand"}
                              </p>

                            </div>

                          </div>


                          {/* Status */}
                          <StatusBadge
                            status={proposal.status}
                          />

                        </div>


                        {/* ================= MESSAGE ================= */}

                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5">

                          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                            Your Proposal
                          </p>

                          <p className="mt-2 text-sm leading-7 text-slate-700">
                            {proposal.message ||
                              "No proposal message provided."}
                          </p>

                        </div>


                        {/* ================= DETAILS ================= */}

                        <div className="mt-5 grid gap-4 sm:grid-cols-3">

                          <InfoCard
                            icon={<FiDollarSign size={17} />}
                            label="Quoted Price"
                            value={`₹${
                              proposal.quotedPrice || 0
                            }`}
                          />

                          <InfoCard
                            icon={<FiClock size={17} />}
                            label="Delivery"
                            value={`${
                              proposal.deliveryDays || 0
                            } days`}
                          />

                          <InfoCard
                            icon={<FiFileText size={17} />}
                            label="Status"
                            value={
                              proposal.status || "Unknown"
                            }
                          />

                        </div>


                        {/* ================= ACTION ================= */}

                        <button
                          onClick={() =>
                            campaign?._id &&
                            navigate(
                              `/campaign/${campaign._id}`
                            )
                          }
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/15 transition hover:bg-blue-700"
                        >
                          View Campaign
                          <FiArrowRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </button>

                      </div>

                    </article>
                  );
                })}

              </div>

            </section>
          )}


          {/* ================= BOTTOM CTA ================= */}

          <section className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">

            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-medium text-blue-100">
                  Creator Opportunities
                </p>

                <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                  Ready for your next collaboration?
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  Explore active campaigns and find brands that match
                  your content.
                </p>

              </div>

              <button
                onClick={() => navigate("/campaigns")}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
              >
                Explore Campaigns
                <FiArrowRight size={17} />
              </button>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}


/* ========================================================= */
/* HERO STAT */
/* ========================================================= */

function HeroStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm">

      <p className="text-xs text-blue-100">
        {label}
      </p>

      <p className="mt-0.5 text-lg font-bold">
        {value}
      </p>

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
/* STATUS BADGE */
/* ========================================================= */

function StatusBadge({ status }) {
  const style =
    status === "pending"
      ? "border-blue-100 bg-blue-50 text-blue-700"
      : status === "accepted"
      ? "border-emerald-100 bg-emerald-50 text-emerald-700"
      : status === "rejected"
      ? "border-red-100 bg-red-50 text-red-700"
      : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <span
      className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold capitalize ${style}`}
    >
      {status}
    </span>
  );
}


/* ========================================================= */
/* INFO CARD */
/* ========================================================= */

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">

      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 font-bold capitalize text-slate-900">
        {value}
      </p>

    </div>
  );
}

export default MyProposals;