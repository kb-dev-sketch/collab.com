import { useContext ,useState,useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { getAllCampaigns } from "../services/campaign";
import Loader from "../components/Loader";
import { getProposalBycampaignId } from "../services/proposal";

function BrandDashboard() {
    
  const { user, loading } = useContext(AuthContext);
const [campaigns,setCampaigns]=useState([])
const [loadingData,setLoadingData]=useState(true)
const [proposals,setProposals]=useState([])
 useEffect(()=>{
    const fetchDashboardData=async()=>{
        try{
            const response=await getAllCampaigns();
            const campaignData=response.data
            console.log("Brand Campaigns:",campaignData)
            setCampaigns(campaignData)
            // get proposal for each campaign
            const proposalResponse=await Promise.all(
              campaignData.map((campaign)=>
              getProposalBycampaignId(campaign._id)
            )
            )
            console.log(
  "Campaign IDs:",
  campaignData.map((campaign) => campaign._id)
);
            // extract proposal from response
            const allProposals=proposalResponse.flat();
            console.log("Brand Proposals",allProposals)
            setProposals(allProposals)
        }
        catch(error){
       console.error(error)
        }
        finally{
            setLoadingData(false)
        }
    }
    fetchDashboardData();

 },[])
 if(loading ||loadingData){
    return <Loader />
 }
 const activeCampaigns=campaigns.filter(
    (campaign)=>campaign.status==="Active"
 )
 const completedCampaigns=campaigns.filter(
  (campaign)=>campaign.status==="Completed"
 )

const pendingProposals=proposals.filter(
  (proposal)=>proposal.status==="pending"
)
const acceptedProposals=proposals.filter(
  (proposal)=>proposal.status="accepted"
)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* Greeting */}

        <h1 className="text-4xl font-bold">
          Welcome, {user?.username} 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your campaigns and creator collaborations.
        </p>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-4 gap-6">

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">{activeCampaigns.length}</h2>
            <p className="mt-1 text-gray-500">
              Active Campaigns
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">{pendingProposals.length}</h2>
            <p className="mt-1 text-gray-500">
              Pending Proposals
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">{acceptedProposals.length}</h2>
            <p className="mt-1 text-gray-500">
              Ongoing Collaborations
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">{completedCampaigns.length}</h2>
            <p className="mt-1 text-gray-500">
              Completed Campaigns
            </p>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="flex gap-4">

            <button className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
              Create Campaign
            </button>

            <button className="rounded-lg border bg-white px-5 py-3 hover:bg-gray-100">
              View Proposals
            </button>

            <button className="rounded-lg border bg-white px-5 py-3 hover:bg-gray-100">
              Find Creators
            </button>

          </div>
        </div>

        {/* Recent Campaigns */}

        <div className="mt-10">

          <h2 className="mb-4 text-2xl font-bold">
            Recent Campaigns
          </h2>
          {campaigns.length === 0 ? (
  <div className="rounded-xl bg-white p-6 shadow">
    <h3 className="text-xl font-semibold">
      No campaigns yet
    </h3>

    <p className="mt-2 text-gray-500">
      Create your first campaign and start
      collaborating with creators.
    </p>

    <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
      Create Campaign
    </button>
  </div>
) : (
  <div className="grid gap-5 md:grid-cols-2">
    {campaigns.slice(0, 4).map((campaign) => (
      <div
        key={campaign._id}
        className="rounded-xl bg-white p-6 shadow"
      >
        <h3 className="text-xl font-semibold">
          {campaign.title}
        </h3>

        <p className="mt-2 text-gray-500">
          {campaign.description}
        </p>
      </div>
    ))}
  </div>
)}
            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
              Create Campaign
            </button>

          </div>

        </div>

      </div>
    
  );
}

export default BrandDashboard;