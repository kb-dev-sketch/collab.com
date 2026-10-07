import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
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
        return "border-blue-100 bg-blue-50 text-blue-700";

      case "Completed":
        return "border-indigo-100 bg-indigo-50 text-indigo-700";

      case "Cancelled":
        return "border-slate-200 bg-slate-100 text-slate-600";

      case "Draft":
        return "border-sky-100 bg-sky-50 text-sky-700";

      default:
        return "border-slate-200 bg-slate-50 text-slate-600";
    }
  };

  return (
    <article
      className="
        group relative overflow-hidden
        rounded-2xl border border-blue-100
        bg-white shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
        hover:shadow-blue-100/50
      "
    >
      {/* Top accent */}
      <div
        className="
          h-1.5 w-full
          bg-gradient-to-r
          from-blue-600 via-blue-500
          to-indigo-600
        "
      />

      <div className="p-4 sm:p-6">
        {/* Top */}
        <div
          className="
            flex flex-col
            gap-3
            sm:flex-row sm:items-start
            sm:justify-between sm:gap-4
          "
        >
          <div
            className="
              flex min-w-0
              items-start gap-3
            "
          >
            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl bg-blue-50
                text-blue-600
                transition
                group-hover:bg-blue-600
                group-hover:text-white
              "
            >
              <FiBriefcase size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <h2
                className="
                  break-words
                  text-base font-bold
                  text-slate-900
                  sm:text-lg
                "
              >
                {title}
              </h2>

              <p
                className="
                  mt-1 truncate
                  text-sm text-slate-500
                "
              >
                {company || "Brand"}
              </p>
            </div>
          </div>

          {/* Status */}
          <span
            className={`
              self-start
              rounded-full border
              px-3 py-1.5
              text-xs font-semibold
              ${getStatusStyle()}
            `}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        <p
          className="
            mt-5 line-clamp-3
            text-sm leading-6
            text-slate-500
          "
        >
          Discover the details of this campaign, understand the
          requirements, and see whether it is the right opportunity
          for you.
        </p>

        {/* Info */}
        <div
          className="
            mt-6 grid
            grid-cols-1 gap-3
            min-[420px]:grid-cols-2
          "
        >
          <div
            className="
              min-w-0 rounded-xl
              bg-blue-50/70 p-4
            "
          >
            <div
              className="
                flex items-center gap-2
                text-xs font-medium
                uppercase tracking-wide
                text-slate-400
              "
            >
              <FiBriefcase size={14} />
              Budget
            </div>

            <p
              className="
                mt-1.5 break-words
                text-lg font-bold
                text-blue-700
              "
            >
              ₹{budget || 0}
            </p>
          </div>

          <div
            className="
              min-w-0 rounded-xl
              bg-slate-50 p-4
            "
          >
            <div
              className="
                flex items-center gap-2
                text-xs font-medium
                uppercase tracking-wide
                text-slate-400
              "
            >
              <FiUsers size={14} />
              Type
            </div>

            <p
              className="
                mt-1.5 break-words
                text-sm font-bold
                text-slate-800
              "
            >
              {isBrand
                ? "Your Campaign"
                : "Opportunity"}
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => navigate(`/campaign/${id}`)}
          className="
            mt-6 flex w-full
            items-center justify-center
            gap-2 rounded-xl
            bg-blue-600 px-4 py-3
            text-sm font-semibold
            text-white
            shadow-md shadow-blue-600/15
            transition-all duration-200
            hover:bg-blue-700
            hover:shadow-lg
            sm:text-base
          "
        >
          <span>
            {isBrand
              ? "Manage Campaign"
              : "View Details"}
          </span>

          <FiArrowRight
            size={17}
            className="
              shrink-0
              transition-transform duration-200
              group-hover:translate-x-1
            "
          />
        </button>
      </div>

      {/* Hover glow */}
      <div
        className="
          pointer-events-none
          absolute -bottom-16 -right-16
          h-32 w-32
          rounded-full
          bg-blue-100/50
          opacity-0 blur-2xl
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />
    </article>
  );
}

export default CampaignCard;