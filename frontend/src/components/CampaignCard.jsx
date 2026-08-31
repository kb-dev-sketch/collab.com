import { useNavigate } from "react-router-dom";

function CampaignCard({
  id,
  title,
  company,
  budget,
  status,
  role,
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {status}
        </span>
      </div>

      <p className="mt-2 text-gray-500">
        {company}
      </p>

      <p className="mt-4 font-semibold">
        Budget: ₹{budget}
      </p>

      <button
        onClick={() => navigate(`/campaign/${id}`)}
        className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        {role === "brand"
          ? "Manage Campaign"
          : "View Details"}
      </button>
    </div>
  );
}

export default CampaignCard;