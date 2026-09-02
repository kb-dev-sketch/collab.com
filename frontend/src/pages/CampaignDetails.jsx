import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";
import { getCampaignById } from "../services/campaign";

function CampaignDetails() {
  const { campaignId } = useParams();

  const navigate = useNavigate();

  const { user, loading: authLoading } =
    useContext(AuthContext);

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
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

  if (error) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="rounded-xl bg-red-50 p-6 text-red-600">
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8">
          <p>Campaign not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-500 hover:text-black"
        >
          ← Back
        </button>

        {/* Header */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold">
                {campaign.title}
              </h1>

              <p className="mt-2 text-gray-500">
                {campaign.brandId?.companyName}
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              {campaign.status}
            </span>
          </div>

          {/* Description */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              About Campaign
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {campaign.description}
            </p>
          </div>

          {/* Requirements */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              Requirements
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {campaign.requirements}
            </p>
          </div>

          {/* Deliverables */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              Deliverables
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {campaign.deliverables}
            </p>
          </div>

          {/* Niches */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              Niches
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {campaign.niches?.map((niche) => (
                <span
                  key={niche}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {niche}
                </span>
              ))}
            </div>
          </div>

          {/* Platforms */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              Platforms
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {campaign.platforms?.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Budget */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Budget
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ₹{campaign.budget}
            </h2>
          </div>

          {/* Start Date */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Start Date
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              {new Date(
                campaign.startDate
              ).toLocaleDateString()}
            </h2>
          </div>

          {/* End Date */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              End Date
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              {new Date(
                campaign.endDate
              ).toLocaleDateString()}
            </h2>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          {user?.role === "creator" ? (
            <button
              onClick={() =>
                navigate(
                  `/campaign/${campaign._id}/proposal`
                )
              }
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Send Proposal
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() =>
                  navigate(
                    `/campaign/${campaign._id}/proposals`
                  )
                }
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                View Proposals
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/campaign/${campaign._id}/edit`
                  )
                }
                className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-50"
              >
                Edit Campaign
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CampaignDetails;