import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCampaign } from "../services/campaign";
import Sidebar from "../components/Sidebar";

import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCheck,
 
  FiDollarSign,
  FiFileText,
  FiGlobe,
  FiLayers,
  FiSend,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

function CreateCampaign() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    niches: [],
    platforms: [],
    budget: "",
    requirements: "",
    deliverables: "",
    startDate: "",
    endDate: "",
    status: "Draft",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(
          (item) => item !== value
        ),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await createCampaign({
        ...formData,
        budget: Number(formData.budget),
      });

      console.log("Created campaign:", response.data);

      alert("Campaign created successfully");

      navigate("/campaigns");
    } catch (error) {
      console.error("Create campaign error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create campaign"
      );
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    "Instagram",
    "YouTube",
    "TikTok",
    "Twitter",
    "Facebook",
    "LinkedIn",
  ];

  const niches = [
    "Technology",
    "Gaming",
    "Fashion",
    "Fitness",
    "Lifestyle",
    "Finance",
    "Travel",
    "Food",
    "Education",
    "Business",
    "Entertainment",
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-6xl p-5 sm:p-6 lg:p-10">

          {/* ================= BACK ================= */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <FiArrowLeft size={16} />
            Back
          </button>


          {/* ================= HERO ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                  <FiBriefcase size={14} />
                  Campaign Management
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Create a new campaign
                </h1>

                <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
                  Define your campaign goals, requirements, budget, and
                  platforms to attract the right creators.
                </p>

              </div>

              {/* Hero info */}
              <div className="w-full max-w-xs rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700">
                    <FiUsers size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-blue-100">
                      Goal
                    </p>

                    <p className="mt-1 font-bold">
                      Find the right creators
                    </p>
                  </div>

                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-1/3 rounded-full bg-white" />
                </div>

                <p className="mt-2 text-xs text-blue-100">
                  Step 1 of your campaign setup
                </p>

              </div>

            </div>

          </section>


          {/* ================= ERROR ================= */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-500">
                  <FiFileText size={17} />
                </div>

                <div>
                  <h3 className="font-semibold text-red-800">
                    Campaign could not be created
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                </div>

              </div>
            </div>
          )}


          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* ================= BASIC INFORMATION ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon={<FiBriefcase size={19} />}
                title="Campaign Basics"
                description="Start with the key information creators need to understand your campaign."
              />

              <div className="mt-7 space-y-6">

                {/* Campaign Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Campaign Title
                  </label>

                  <div className="relative">

                    <FiBriefcase
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                    />

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Summer Tech Campaign"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />

                  </div>
                </div>


                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Campaign Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your campaign goals, target audience, brand message, and what you want creators to communicate..."
                    rows="6"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    A clear description helps creators decide whether your
                    campaign is right for them.
                  </p>
                </div>

              </div>
            </section>


            {/* ================= BUDGET ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon={<FiDollarSign size={19} />}
                title="Budget"
                description="Set the amount you are willing to spend on this campaign."
              />

              <div className="mt-7 max-w-xl">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Campaign Budget
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-blue-600">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="50000"
                    min="0"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-10 pr-4 text-lg font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />

                </div>

              </div>
            </section>


            {/* ================= REQUIREMENTS & DELIVERABLES ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon={<FiTarget size={19} />}
                title="Campaign Expectations"
                description="Tell creators what you expect from them and what they need to deliver."
              />

              <div className="mt-7 grid gap-6 lg:grid-cols-2">

                {/* Requirements */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Requirements
                  </label>

                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="What do you expect from the creator?"
                    rows="7"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />

                </div>


                {/* Deliverables */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Deliverables
                  </label>

                  <textarea
                    name="deliverables"
                    value={formData.deliverables}
                    onChange={handleChange}
                    placeholder="Reel, post, story, video, product review..."
                    rows="7"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    required
                  />

                </div>

              </div>

            </section>


            {/* ================= PLATFORMS ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon={<FiGlobe size={19} />}
                title="Platforms"
                description="Choose the platforms where you want your campaign content published."
              />

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {platforms.map((platform) => {

                  const selected =
                    formData.platforms.includes(platform);

                  return (
                    <label
                      key={platform}
                      className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-200 ${
                        selected
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                            selected
                              ? "bg-blue-600 text-white"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          <FiGlobe size={18} />
                        </div>

                        <span
                          className={`text-sm font-semibold ${
                            selected
                              ? "text-blue-700"
                              : "text-slate-700"
                          }`}
                        >
                          {platform}
                        </span>

                      </div>

                      <input
                        type="checkbox"
                        name="platforms"
                        value={platform}
                        checked={selected}
                        onChange={handleArrayChange}
                        className="sr-only"
                      />

                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {selected && <FiCheck size={13} />}
                      </div>

                    </label>
                  );
                })}

              </div>

              {formData.platforms.length > 0 && (
                <div className="mt-5 rounded-2xl bg-blue-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Selected Platforms
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">

                    {formData.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm"
                      >
                        {platform}
                      </span>
                    ))}

                  </div>

                </div>
              )}

            </section>


            {/* ================= NICHES ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon={<FiLayers size={19} />}
                title="Target Niches"
                description="Select the creator categories that best fit your campaign."
              />

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

                {niches.map((niche) => {

                  const selected =
                    formData.niches.includes(niche);

                  return (
                    <label
                      key={niche}
                      className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${
                        selected
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/40"
                      }`}
                    >

                      <input
                        type="checkbox"
                        name="niches"
                        value={niche}
                        checked={selected}
                        onChange={handleArrayChange}
                        className="sr-only"
                      />

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {selected && <FiCheck size={12} />}
                      </div>

                      <span className="text-sm font-medium">
                        {niche}
                      </span>

                    </label>
                  );
                })}

              </div>

              {formData.niches.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">

                  {formData.niches.map((niche) => (
                    <span
                      key={niche}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                    >
                      {niche}
                    </span>
                  ))}

                </div>
              )}

            </section>


            {/* ================= DATES ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon={<FiCalendar size={19} />}
                title="Campaign Timeline"
                description="Set the time period during which your campaign will be active."
              />

              <div className="mt-7 grid gap-6 md:grid-cols-2">

                {/* Start */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Start Date
                  </label>

                  <div className="relative">

                    <FiCalendar
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                    />

                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />

                  </div>

                </div>


                {/* End */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    End Date
                  </label>

                  <div className="relative">

                    <FiCalendar
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                    />

                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />

                  </div>

                </div>

              </div>

            </section>


            {/* ================= CAMPAIGN PREVIEW ================= */}
            <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

              <div className="border-b border-blue-100 bg-blue-50/60 p-6 sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                    <FiFileText size={19} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Campaign Preview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      This is how your basic campaign information comes together.
                    </p>
                  </div>

                </div>

              </div>


              <div className="p-6 sm:p-8">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      Campaign
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-slate-900">
                      {formData.title || "Your Campaign Title"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {formData.description ||
                        "Your campaign description will appear here."}
                    </p>

                  </div>

                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    Draft
                  </span>

                </div>


                <div className="mt-6 grid gap-4 sm:grid-cols-3">

                  <PreviewStat
                    icon={<FiDollarSign />}
                    label="Budget"
                    value={
                      formData.budget
                        ? `₹${formData.budget}`
                        : "₹0"
                    }
                  />

                  <PreviewStat
                    icon={<FiGlobe />}
                    label="Platforms"
                    value={
                      formData.platforms.length
                        ? `${formData.platforms.length} selected`
                        : "None selected"
                    }
                  />

                  <PreviewStat
                    icon={<FiLayers />}
                    label="Niches"
                    value={
                      formData.niches.length
                        ? `${formData.niches.length} selected`
                        : "None selected"
                    }
                  />

                </div>


                {(formData.startDate || formData.endDate) && (
                  <div className="mt-4 flex flex-wrap gap-3">

                    {formData.startDate && (
                      <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                        <FiCalendar className="text-blue-500" />
                        Starts: {formData.startDate}
                      </span>
                    )}

                    {formData.endDate && (
                      <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                        <FiCalendar className="text-blue-500" />
                        Ends: {formData.endDate}
                      </span>
                    )}

                  </div>
                )}

              </div>

            </section>


            {/* ================= SUBMIT ================= */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">

              <div className="absolute -right-16 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <FiSend size={21} />
                  </div>

                  <div>

                    <p className="text-sm font-medium text-blue-100">
                      Ready to launch?
                    </p>

                    <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                      Create your campaign
                    </h2>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-blue-100">
                      Publish your campaign and start receiving proposals
                      from creators.
                    </p>

                  </div>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-700" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Campaign
                      <FiArrowRight size={17} />
                    </>
                  )}
                </button>

              </div>

            </section>

          </form>

        </div>
      </main>
    </div>
  );
}


/* ========================================================= */
/* SECTION HEADER */
/* ========================================================= */

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
}


/* ========================================================= */
/* PREVIEW STAT */
/* ========================================================= */

function PreviewStat({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <p className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </p>
      </div>

      <p className="mt-2 font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

export default CreateCampaign;