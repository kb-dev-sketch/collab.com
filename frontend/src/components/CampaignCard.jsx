import { useNavigate } from "react-router-dom";
function CampaignCard({ id,title, company, budget }) {
  const navigate=useNavigate();
  const handleClick=()=>{

    navigate(`/campaign/${id}`)
  }
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="text-gray-500">{company}</p>

      <p className="mt-2 font-semibold">{budget}</p>

      <button onClick={handleClick} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
        View Details
      </button>
    </div>
  );
}

export default CampaignCard;