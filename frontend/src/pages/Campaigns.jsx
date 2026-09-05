import Sidebar from "../components/Sidebar";
import CampaignCard from "../components/campaignCard";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import { useEffect, useState, useContext } from "react";

import { getAllCampaigns } from "../services/campaign";
import { AuthContext } from "../context/AuthContext";

import {
  FiPlus,
  FiSearch,
  FiBriefcase,
  FiRefreshCw,
  FiArrowRight,
} from "react-icons/fi";

function Campaigns() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setError("");

        const response = await getAllCampaigns();

        const campaignData = response.data || [];

        setCampaigns(campaignData);

        console.log("Campaigns:", campaignData);
        console.log("Is Array:", Array.isArray(campaignData));
      } catch (error) {
        console.error("Campaign fetch error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load campaigns. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading || authLoading) {
    return <Loader />;
  }

  const isBrand = user?.role === "brand";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-5 sm:p-6 lg:p-10">

          {/* ================= HEADER ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            {/* Decorative background */}
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="max-w-2xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                  <FiBriefcase size={14} />
                  {isBrand ? "Campaign Management" : "Campaign Discovery"}
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {isBrand ? "My Campaigns" : "Explore Campaigns"}
                </h1>

                <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
                  {isBrand
                    ? "Manage your campaigns, track proposals, and connect with the right creators."
                    : "Discover active campaigns that match your niche, skills, and audience."}
                </p>

                {/* Small stats */}
                <div className="mt-6 flex flex-wrap gap-3">

                  <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                    <p className="text-xs text-blue-100">
                      Available
                    </p>

                    <p className="mt-0.5 text-lg font-bold">
                      {campaigns.length}
                    </p>
                  </div>

                  {isBrand && (
                    <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                      <p className="text-xs text-blue-100">
                        Active
                      </p>

                      <p className="mt-0.5 text-lg font-bold">
                        {
                          campaigns.filter(
                            (campaign) =>
                              campaign.status === "Active"
                          ).length
                        }
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* Create button */}
              {isBrand && (
                <button
                  onClick={() => navigate("/CreateCampaign")}
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  <FiPlus size={18} />
                  Create Campaign
                </button>
              )}

            </div>
          </section>


          {/* ================= TOOLBAR ================= */}
          <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {isBrand ? "Your Campaigns" : "Available Opportunities"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {isBrand
                  ? "Review and manage all campaigns created by your brand."
                  : "Choose a campaign that fits your content and audience."}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm">
              <FiSearch className="text-blue-500" size={17} />
              <span>{campaigns.length} campaigns</span>
            </div>

          </section>


          {/* ================= ERROR ================= */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h3 className="font-semibold text-red-800">
                    Unable to load campaigns
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                </div>

                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-100"
                >
                  <FiRefreshCw size={16} />
                  Try Again
                </button>

              </div>
            </div>
          )}


          {/* ================= EMPTY STATE ================= */}
          {!error && campaigns.length === 0 && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <FiBriefcase size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {isBrand
                  ? "You haven't created any campaigns yet"
                  : "No active campaigns available"}
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                {isBrand
                  ? "Create your first campaign and start connecting with talented creators."
                  : "There are currently no campaigns matching your availability. Check again later for new opportunities."}
              </p>

              {isBrand && (
                <button
                  onClick={() => navigate("/CreateCampaign")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  <FiPlus size={18} />
                  Create Your First Campaign
                </button>
              )}

            </div>
          )}


          {/* ================= CAMPAIGNS ================= */}
          {campaigns.length > 0 && (
            <section className="mt-8">

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {campaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign._id}
                    id={campaign._id}
                    title={campaign.title}
                    company={campaign.brandId?.companyName}
                    budget={campaign.budget}
                    status={campaign.status}
                    role={user?.role}
                  />
                ))}

              </div>

            </section>
          )}

        </div>
      </main>
    </div>
  );
}

export default Campaigns;