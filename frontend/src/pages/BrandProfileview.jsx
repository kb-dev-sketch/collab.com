import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCheckCircle,
  FiEdit3,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiUsers,
  FiTwitter,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getbrandProfile } from "../services/brand";

function BrandProfileView() {
  const navigate = useNavigate();

  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrandProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getbrandProfile();
        setBrand(response.data);
      } catch (error) {
        console.error("Error fetching brand profile:", error);
        setError(
          error?.response?.data?.message || "Failed to fetch brand profile",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrandProfile();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex min-w-0 flex-1 items-center justify-center px-4 pb-6 pt-20 sm:p-6 lg:pt-6">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              !
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Unable to load profile
            </h2>

            <p className="mt-2 break-words text-sm text-slate-500">{error}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => navigate(-1)}
                className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-fit"
              >
                Go Back
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 sm:w-fit"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="min-w-0 flex-1 pt-16 lg:pt-0">
          <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-6 sm:p-6 lg:min-h-screen">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <FiBriefcase className="text-xl" />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Brand Profile Not Found
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create your brand profile to start collaborating with creators.
              </p>

              <button
                onClick={() => navigate("/brand-profile")}
                className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 sm:w-fit"
              >
                Create Profile
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const instagram = brand.socials?.instagram || "";
  const linkedin = brand.socials?.linkedin || "";
  const twitter = brand.socials?.x || "";
  const profileCompletion = brand.profileCompleted ? 100 : 70;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-16 lg:pt-0">
        <div className="mx-auto min-w-0 max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <FiArrowLeft />
            Back
          </button>

          <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white/20 bg-white/10 backdrop-blur">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.companyName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiBriefcase className="text-4xl text-white/80" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h1 className="break-words text-2xl font-bold sm:text-3xl">
                      {brand.companyName}
                    </h1>
                    {brand.isVerified && (
                      <FiCheckCircle className="shrink-0 text-blue-200" />
                    )}
                  </div>

                  <p className="mt-1 break-words text-blue-100">
                    {brand.industry || "Industry not specified"}
                  </p>

                  {brand.location && (
                    <div className="mt-3 flex min-w-0 items-center justify-center gap-2 text-sm text-blue-100 sm:justify-start">
                      <FiMapPin className="shrink-0" />
                      <span className="break-words">{brand.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => navigate("/brand-profile")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50 sm:w-fit"
              >
                <FiEdit3 />
                Edit Profile
              </button>
            </div>
          </section>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<FiBriefcase />}
              value={brand.totalCampaigns ?? 0}
              label="Total Campaigns"
            />
            <StatCard
              icon="★"
              value={brand.averageRating ?? 0}
              label="Average Rating"
            />
            <StatCard
              icon={<FiUsers />}
              value={brand.totalReviews ?? 0}
              label="Reviews"
            />
            <StatCard
              icon={<FiCheckCircle />}
              value={brand.isVerified ? "Verified" : "Not Verified"}
              label="Brand Status"
              largeValue
            />
          </div>

          <div className="grid min-w-0 gap-8 lg:grid-cols-3">
            <div className="min-w-0 space-y-8 lg:col-span-2">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                  About Company
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Learn more about this brand.
                </p>
                <p className="mt-5 break-words leading-7 text-slate-600">
                  {brand.description ||
                    "No company description has been added yet."}
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Company Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Important information about your company.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <DetailCard
                    icon={<FiBriefcase />}
                    label="Industry"
                    value={brand.industry || "Not specified"}
                  />
                  <DetailCard
                    icon={<FiUsers />}
                    label="Company Size"
                    value={brand.companySize || "Not specified"}
                  />
                  <DetailCard
                    icon={<FiMapPin />}
                    label="Location"
                    value={brand.location || "Not specified"}
                  />

                  <div className="min-w-0 rounded-xl bg-slate-50 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Website
                    </p>

                    <div className="flex min-w-0 items-center gap-2">
                      <FiGlobe className="shrink-0 text-blue-500" />

                      {brand.website ? (
                        <a
                          href={brand.website}
                          target="_blank"
                          rel="noreferrer"
                          className="min-w-0 flex-1 truncate font-semibold text-blue-600 hover:underline"
                        >
                          {brand.website}
                        </a>
                      ) : (
                        <span className="font-semibold text-slate-500">
                          Not added
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="min-w-0 w-full space-y-8">
              <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-bold text-slate-900">
                      Profile Completion
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Keep your profile complete
                    </p>
                  </div>

                  <span className="shrink-0 text-lg font-bold text-blue-600">
                    {profileCompletion}%
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600">
                  <FiCheckCircle />
                  {brand.profileCompleted
                    ? "Profile is complete"
                    : "Complete your profile"}
                </div>
              </section>

              <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-bold text-slate-900">Social Presence</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Connect with your audience
                </p>

                <div className="mt-5 space-y-3">
                  <SocialLink
                    icon={<FiInstagram />}
                    name="Instagram"
                    value={instagram}
                  />
                  <SocialLink
                    icon={<FiLinkedin />}
                    name="LinkedIn"
                    value={linkedin}
                  />
                  <SocialLink
                    icon={<FiTwitter />}
                    name="X / Twitter"
                    value={twitter}
                  />
                </div>
              </section>

              <section className="w-full min-w-0 overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-100">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <FiCheckCircle className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold">
                      {brand.isVerified
                        ? "Verified Brand"
                        : "Verification Pending"}
                    </h3>

                    <p className="mt-2 break-words text-sm leading-5 text-blue-100">
                      {brand.isVerified
                        ? "Your brand profile has been verified and is trusted by creators."
                        : "Complete verification to build more trust with creators."}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, value, label, largeValue = false }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>
      <p
        className={
          largeValue
            ? "break-words text-lg font-bold text-slate-900"
            : "break-words text-2xl font-bold text-slate-900"
        }
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="min-w-0 rounded-xl bg-slate-50 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-blue-500">{icon}</span>
        <p className="min-w-0 break-words font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function SocialLink({ icon, name, value }) {
  if (!value) {
    return (
      <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-700">{name}</p>
          <p className="text-xs text-slate-400">Not connected</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={value}
      target="_blank"
      rel="noreferrer"
      className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="truncate text-xs text-slate-400">{value}</p>
      </div>
    </a>
  );
}

export default BrandProfileView;