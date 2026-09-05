import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { createCreatorProfile } from "../services/creator";

import {
  FiUser,
  FiMapPin,
  FiGlobe,
  FiImage,
  FiInstagram,
  FiYoutube,
  FiTwitter,
  FiMusic,
  FiLink,
  FiPlus,
  FiTrash2,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiCheckCircle,
  FiArrowRight,
  
} from "react-icons/fi";

function CreatorProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    niches: [],
    profileImage: "",
    bio: "",
    city: "",
    language: "",
    socials: {
      instagram: "",
      youtube: "",
      twitter: "",
      tiktok: "",
      website: "",
    },
    followers: 0,
    engagementRate: 0,
    pricePerPost: 0,
    portfolioLinks: [],
  });

  const [portfolioLink, setPortfolioLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialChange = (e) => {
    setFormData({
      ...formData,
      socials: {
        ...formData.socials,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleNicheChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        niches: [...formData.niches, value],
      });
    } else {
      setFormData({
        ...formData,
        niches: formData.niches.filter(
          (niche) => niche !== value
        ),
      });
    }
  };

  const addPortfolioLink = () => {
    if (!portfolioLink.trim()) {
      return;
    }

    setFormData({
      ...formData,
      portfolioLinks: [
        ...formData.portfolioLinks,
        portfolioLink.trim(),
      ],
    });

    setPortfolioLink("");
  };

  const removePortfolioLink = (index) => {
    setFormData({
      ...formData,
      portfolioLinks: formData.portfolioLinks.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await createCreatorProfile(formData);

      console.log(
        "Creator profile created:",
        response.data
      );

      alert("Creator profile created successfully");

      navigate("/creator-dashboard");
    } catch (error) {
      console.error(
        "Creator profile error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to create creator profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const niches = [
    "Technology",
    "Gaming",
    "Education",
    "Fitness",
    "Fashion",
    "Finance",
    "Travel",
    "Food",
    "Lifestyle",
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

          {/* ================= HERO ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="max-w-2xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                  <FiUser size={14} />
                  Creator Profile
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Build your creator profile
                </h1>

                <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
                  Tell brands who you are, showcase your audience,
                  highlight your niches, and add your best work.
                </p>

              </div>

              {/* Progress */}
              <div className="w-full max-w-xs rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-medium text-blue-100">
                    Profile Setup
                  </span>

                  <span className="text-sm font-bold">
                    100%
                  </span>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-full rounded-full bg-white" />
                </div>

                <p className="mt-3 text-xs text-blue-100">
                  Complete your profile to get discovered by brands.
                </p>

              </div>

            </div>
          </section>


          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* ================= BASIC INFO ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <FormSectionHeader
                icon={<FiUser size={18} />}
                title="Basic Information"
                description="Introduce yourself to potential brand partners."
              />

              <div className="mt-7 grid gap-6 md:grid-cols-2">

                {/* Name */}
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  icon={<FiUser size={17} />}
                  required
                />

                {/* City */}
                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Delhi"
                  icon={<FiMapPin size={17} />}
                  required
                />

                {/* Language */}
                <InputField
                  label="Languages"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="Hindi, English"
                  icon={<FiGlobe size={17} />}
                  required
                />

                {/* Profile image */}
                <InputField
                  label="Profile Image URL"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://..."
                  icon={<FiImage size={17} />}
                />

              </div>


              {/* Profile Preview */}
              {formData.profileImage && (
                <div className="mt-6 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

                  <img
                    src={formData.profileImage}
                    alt="Profile Preview"
                    className="h-16 w-16 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Profile preview
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      This image will appear on your creator profile.
                    </p>
                  </div>

                </div>
              )}


              {/* Bio */}
              <div className="mt-6">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  About You
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell brands about yourself, your content style, audience, and what makes you different..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  required
                />

                <p className="mt-2 text-xs text-slate-400">
                  A strong bio helps brands quickly understand your value.
                </p>

              </div>

            </section>


            {/* ================= NICHES ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <FormSectionHeader
                icon={<FiTrendingUp size={18} />}
                title="Content Niches"
                description="Select the topics and categories you create content around."
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
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/50"
                      }`}
                    >

                      <input
                        type="checkbox"
                        value={niche}
                        checked={selected}
                        onChange={handleNicheChange}
                        className="sr-only"
                      />

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {selected && (
                          <FiCheckCircle size={13} />
                        )}
                      </div>

                      <span className="text-sm font-medium">
                        {niche}
                      </span>

                    </label>
                  );
                })}

              </div>

              {formData.niches.length > 0 && (
                <div className="mt-5 rounded-xl bg-blue-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Selected Niches
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">

                    {formData.niches.map((niche) => (
                      <span
                        key={niche}
                        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm"
                      >
                        {niche}
                      </span>
                    ))}

                  </div>

                </div>
              )}

            </section>


            {/* ================= SOCIAL MEDIA ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <FormSectionHeader
                icon={<FiLink size={18} />}
                title="Social Media"
                description="Add your social profiles so brands can explore your work."
              />

              <div className="mt-7 grid gap-5 md:grid-cols-2">

                <SocialInput
                  name="instagram"
                  label="Instagram"
                  value={formData.socials.instagram}
                  onChange={handleSocialChange}
                  placeholder="@yourusername"
                  icon={<FiInstagram size={17} />}
                />

                <SocialInput
                  name="youtube"
                  label="YouTube"
                  value={formData.socials.youtube}
                  onChange={handleSocialChange}
                  placeholder="YouTube channel URL"
                  icon={<FiYoutube size={17} />}
                />

                <SocialInput
                  name="twitter"
                  label="Twitter / X"
                  value={formData.socials.twitter}
                  onChange={handleSocialChange}
                  placeholder="@yourusername"
                  icon={<FiTwitter size={17} />}
                />

                <SocialInput
                  name="tiktok"
                  label="TikTok"
                  value={formData.socials.tiktok}
                  onChange={handleSocialChange}
                  placeholder="@yourusername"
                  icon={<FiMusic size={17} />}
                />

                <SocialInput
                  name="website"
                  label="Website"
                  value={formData.socials.website}
                  onChange={handleSocialChange}
                  placeholder="https://yourwebsite.com"
                  icon={<FiGlobe size={17} />}
                />

              </div>

            </section>


            {/* ================= AUDIENCE INFO ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <FormSectionHeader
                icon={<FiUsers size={18} />}
                title="Audience & Pricing"
                description="Help brands understand your reach, engagement, and rates."
              />

              <div className="mt-7 grid gap-5 md:grid-cols-3">

                <StatsInput
                  label="Followers"
                  name="followers"
                  value={formData.followers}
                  onChange={handleChange}
                  placeholder="25000"
                  icon={<FiUsers size={18} />}
                />

                <StatsInput
                  label="Engagement Rate"
                  name="engagementRate"
                  value={formData.engagementRate}
                  onChange={handleChange}
                  placeholder="4.5"
                  suffix="%"
                  icon={<FiTrendingUp size={18} />}
                />

                <StatsInput
                  label="Price Per Post"
                  name="pricePerPost"
                  value={formData.pricePerPost}
                  onChange={handleChange}
                  placeholder="15000"
                  prefix="₹"
                  icon={<FiDollarSign size={18} />}
                />

              </div>

            </section>


            {/* ================= PORTFOLIO ================= */}
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

              <FormSectionHeader
                icon={<FiLink size={18} />}
                title="Portfolio"
                description="Showcase your best work, campaigns, or content."
              />

              <div className="mt-7">

                <div className="flex flex-col gap-3 sm:flex-row">

                  <div className="relative flex-1">

                    <FiLink
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={portfolioLink}
                      onChange={(e) =>
                        setPortfolioLink(e.target.value)
                      }
                      placeholder="https://yourportfolio.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={addPortfolioLink}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/15 transition hover:bg-blue-700"
                  >
                    <FiPlus size={17} />
                    Add Link
                  </button>

                </div>


                {formData.portfolioLinks.length > 0 && (
                  <div className="mt-5 space-y-3">

                    {formData.portfolioLinks.map(
                      (link, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4"
                        >

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                              <FiLink size={16} />
                            </div>

                            <span className="truncate text-sm font-medium text-slate-700">
                              {link}
                            </span>

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removePortfolioLink(index)
                            }
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                          >
                            <FiTrash2 size={15} />
                            Remove
                          </button>

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>

            </section>


            {/* ================= SUBMIT ================= */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">

              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <FiCheckCircle size={22} />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      Ready to launch your profile?
                    </h2>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-blue-100">
                      Complete your profile and start connecting with brands
                      looking for creators like you.
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
                      Create Profile
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
/* FORM SECTION HEADER */
/* ========================================================= */

function FormSectionHeader({
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

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
}


/* ========================================================= */
/* INPUT FIELD */
/* ========================================================= */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  required = false,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </label>

      <div className="relative">

        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />

      </div>

    </div>
  );
}


/* ========================================================= */
/* SOCIAL INPUT */
/* ========================================================= */

function SocialInput({
  name,
  label,
  value,
  onChange,
  placeholder,
  icon,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </label>

      <div className="relative">

        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
          {icon}
        </div>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />

      </div>

    </div>
  );
}


/* ========================================================= */
/* STATS INPUT */
/* ========================================================= */

function StatsInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  prefix,
  suffix,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </label>

      <div className="relative">

        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
          {icon}
        </div>

        {prefix && (
          <span className="pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
            {prefix}
          </span>
        )}

        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min="0"
          className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            prefix ? "pl-18" : "pl-11"
          }`}
        />

        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
            {suffix}
          </span>
        )}

      </div>

    </div>
  );
}

export default CreatorProfile;