import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";

function CampaignCard({
  id,
  title,
  company,
  budget,
  status,
  role,
}) {
  const navigate = useNavigate();

  const isBrand = role === "brand";

  const getStatusStyle = () => {
    switch (status) {
      case "Active":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "Completed":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";

      case "Cancelled":
        return "bg-slate-100 text-slate-600 border-slate-200";

      case "Draft":
        return "bg-sky-50 text-sky-700 border-sky-100";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50">

      {/* Top blue accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

      <div className="p-6">

        {/* ================= TOP ================= */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex min-w-0 items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <FiBriefcase size={20} />
            </div>

            <div className="min-w-0">

              <h2 className="truncate text-lg font-bold text-slate-900">
                {title}
              </h2>

              <p className="mt-1 truncate text-sm text-slate-500">
                {company || "Brand"}
              </p>

            </div>

          </div>

          {/* Status */}
          <span
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle()}`}
          >
            {status}
          </span>

        </div>


        {/* ================= DESCRIPTION ================= */}
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-500">
          Discover the details of this campaign, understand the
          requirements, and see whether it is the right opportunity
          for you.
        </p>


        {/* ================= INFO ================= */}
        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-xl bg-blue-50/70 p-4">

            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <FiBriefcase size={14} />
              Budget
            </div>

            <p className="mt-1.5 text-lg font-bold text-blue-700">
              ₹{budget || 0}
            </p>

          </div>


          <div className="rounded-xl bg-slate-50 p-4">

            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <FiUsers size={14} />
              Type
            </div>

            <p className="mt-1.5 text-sm font-bold text-slate-800">
              {isBrand ? "Your Campaign" : "Opportunity"}
            </p>

          </div>

        </div>


        {/* ================= CTA ================= */}
        <button
          onClick={() => navigate(`/campaign/${id}`)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-md shadow-blue-600/15 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
        >
          {isBrand ? "Manage Campaign" : "View Details"}

          <FiArrowRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

      </div>

      {/* Bottom hover glow */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-blue-100/50 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    </article>
  );
}

export default CampaignCard;