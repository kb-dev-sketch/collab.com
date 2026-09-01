import Sidebar from "../components/Sidebar";
import CampaignCard  from "../components/campaignCard";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {useEffect,useState,useContext} from "react";
import { getAllCampaigns } from "../services/campaign";
import {AuthContext} from "../context/AuthContext";

function Campaigns() {
  const {user,loading:authLoading}=useContext(AuthContext)
  const [campaigns, setCampaigns] = useState([]);
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState("")
  const navigate=useNavigate()

  useEffect(() => {
    const fetchCampaigns = async () => {
      try{
      const response = await getAllCampaigns();
      setCampaigns(response.data);
      console.log(response.data);
      console.log(Array.isArray(response.data));
    }
    catch(error){
      console.error("Campaign fetch error",error)
      setError(
        error.response?.data?.message ||
        "Failed to load campaigns"
      )
    }
    finally{
      setLoading(false)
    }
  }

    fetchCampaigns();
  }, []);
  if( loading || authLoading){
    return <Loader />
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {user?.role === "brand"
                ? "My Campaigns"
                : "Explore Campaigns"}
            </h1>

            <p className="mt-2 text-gray-500">
              {user?.role === "brand"
                ? "Manage your campaigns and creator proposals."
                : "Find campaigns that match your niche."}
            </p>
          </div>

          {/* Only Brand can create campaign */}

          {user?.role === "brand" && (
            <button
              onClick={() => navigate("/CreateCampaign")}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              + Create Campaign
            </button>
          )}
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* No campaigns */}

        {campaigns.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold">
              {user?.role === "brand"
                ? "You haven't created any campaigns yet."
                : "No active campaigns available."}
            </h2>

            {user?.role === "brand" && (
              <button
                onClick={() => navigate("/CreateCampaign")}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white"
              >
                Create Your First Campaign
              </button>
            )}
          </div>
        ) : (
          /* Campaign cards */

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
        )}
      </main>
    </div>
  );
}

export default Campaigns