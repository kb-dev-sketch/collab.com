import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";
import { getProposalBycampaignId } from "../services/proposal";

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

        const response =
          await getProposalBycampaignId(campaignId);

        console.log("Campaign proposals:", response.data);

        setProposals(response.data);
      } catch (error) {
        console.error("Proposal fetch error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load proposals"
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}

        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-500 hover:text-black"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold">
            Campaign Proposals
          </h1>

          <p className="mt-2 text-gray-500">
            Review proposals submitted by influencers.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* No proposals */}

        {proposals.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold">
              No proposals yet
            </h2>

            <p className="mt-2 text-gray-500">
              Influencers haven't applied to this campaign yet.
            </p>
          </div>
        ) : (
          /* Proposal List */

          <div className="space-y-6">
            {proposals.map((proposal) => (
              <div
                key={proposal._id}
                className="rounded-xl bg-white p-6 shadow"
              >
                {/* Influencer Header */}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Profile Image */}

                    <img
                      src={
                        proposal.creatorId?.profileImage ||
                        "https://via.placeholder.com/80"
                      }
                      alt={
                        proposal.creatorId?.name ||
                        "Influencer"
                      }
                      className="h-16 w-16 rounded-full object-cover"
                    />

                    {/* Basic Details */}

                    <div>
                      <h2 className="text-xl font-bold">
                        {proposal.creatorId?.name ||
                          "Influencer"}
                      </h2>

                      <p className="text-sm text-gray-500">
                        @
                        {proposal.creatorId?.username ||
                          "username"}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {proposal.creatorId?.city ||
                          "Location not available"}
                      </p>
                    </div>
                  </div>

                  {/* Proposal Status */}

                  <span
                    className={`
                      rounded-full px-4 py-2 text-sm font-medium
                      ${
                        proposal.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : proposal.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {proposal.status}
                  </span>
                </div>

                {/* Bio */}

                <div className="mt-6">
                  <h3 className="font-semibold">
                    About Influencer
                  </h3>

                  <p className="mt-2 leading-7 text-gray-600">
                    {proposal.creatorId?.bio ||
                      "No bio available"}
                  </p>
                </div>

                {/* Niches */}

                <div className="mt-6">
                  <h3 className="font-semibold">
                    Niches
                  </h3>

                  {proposal.creatorId?.niches?.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {proposal.creatorId.niches.map(
                        (niche) => (
                          <span
                            key={niche}
                            className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                          >
                            {niche}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-gray-500">
                      No niches added
                    </p>
                  )}
                </div>

                {/* Socials */}

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Instagram
                    </p>

                    <p className="mt-1 font-medium">
                      {proposal.creatorId?.socials
                        ?.instagram || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      YouTube
                    </p>

                    <p className="mt-1 font-medium">
                      {proposal.creatorId?.socials
                        ?.youtube || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Twitter
                    </p>

                    <p className="mt-1 font-medium">
                      {proposal.creatorId?.socials
                        ?.twitter || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Website
                    </p>

                    <p className="mt-1 font-medium">
                      {proposal.creatorId?.socials
                        ?.website || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Influencer Stats */}

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Followers
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {proposal.creatorId?.followers || 0}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Engagement Rate
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {proposal.creatorId?.engagementRate ||
                        0}
                      %
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Price Per Post
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      ₹
                      {proposal.creatorId?.pricePerPost ||
                        0}
                    </p>
                  </div>
                </div>

                {/* Proposal Details */}

                <div className="mt-6 border-t pt-6">
                  <h3 className="font-semibold">
                    Proposal Message
                  </h3>

                  <p className="mt-2 leading-7 text-gray-600">
                    {proposal.message}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">
                        Quoted Price
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        ₹{proposal.quotedPrice}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">
                        Delivery Time
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {proposal.deliveryDays} days
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}

                {proposal.status === "pending" && (
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default CampaignProposals;