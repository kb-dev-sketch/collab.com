import Sidebar from "../components/Sidebar";
import CampaignCard  from "../components/campaignCard";
import {useEffect,useState} from "react";
import { getAllCampaigns } from "../services/campaign";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await getAllCampaigns();
      setCampaigns(response.data);
      console.log(response.data);
      console.log(Array.isArray(response.data));
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="mb-8 text-4xl font-bold">
          Explore Campaigns
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign._id}
              title={campaign.title}
              company={campaign.company}
              budget={campaign.budget}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Campaigns;