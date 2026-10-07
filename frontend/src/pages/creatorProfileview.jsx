import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiEdit3,
  FiMapPin,
  FiGlobe,
  FiInstagram,
  FiYoutube,
  FiTwitter,
  FiExternalLink,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiCheckCircle,
  FiBriefcase,
  FiUser,
  FiPlayCircle,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getCreatorProfile } from "../services/creator";

function CreatorProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCreatorProfile();
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching creator profile:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load creator profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <main className="flex min-w-0 flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              !
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Profile unavailable
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!profile) return null;

  const socials = profile.socials || {};

  /*
   * Profile completion is calculated from the fields
   * that matter for a creator profile.
   */
  const completionFields = [
    profile.name,
    profile.profileImage,
    profile.bio,
    profile.city,
    profile.language,
    profile.niches?.length,
    profile.followers,
    profile.engagementRate,
    profile.pricePerPost,
    socials.instagram,
    socials.youtube,
    socials.twitter,
    socials.tiktok,
    socials.website,
    profile.portfolioLinks?.length,
  ];

  const completedFields = completionFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields / completionFields.length) * 100
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1 pt-16 lg:pt-0">
   <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8">

          {/* =====================================================
              PROFILE HERO
          ====================================================== */}
          <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

            {/* Blue Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-4 py-6 sm:px-8 sm:py-8">

              {/* Decorative circles */}
              <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-white/10" />
              <div className="absolute right-32 -bottom-24 h-48 w-48 rounded-full bg-white/10" />

             <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Creator information */}
            <div className="flex min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left">
                  {/* Profile image */}
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="h-24 w-24 shrink-0 rounded-2xl border-4 border-white/30 bg-white object-cover shadow-xl sm:h-28 sm:w-28"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white/30 bg-white/10 text-4xl font-bold uppercase text-white shadow-xl backdrop-blur-sm sm:h-28 sm:w-28">
                      {profile.name?.charAt(0) || "C"}
                    </div>
                  )}

                  {/* Name + details */}
                  <div className="min-w-0 text-white">

                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl font-bold sm:text-3xl">
                        {profile.name || "Creator"}
                      </h1>

                      {profile.isVerified && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600">
                          <FiCheckCircle size={13} />
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-blue-100">
                      @{profile.username || "username"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-blue-100">

                      {profile.city && (
                        <span className="inline-flex items-center gap-1.5">
                          <FiMapPin size={15} />
                          {profile.city}
                        </span>
                      )}

                      {profile.language && (
                        <span className="inline-flex items-center gap-1.5">
                          <FiGlobe size={15} />
                          {profile.language}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1.5">
                        <FiBriefcase size={15} />
                        Creator
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit button */}
                <Link
                  to="/creator-profile"
                  className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 sm:w-fit"
                >
                  <FiEdit3 size={16} />
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Bio */}
            <div className="px-6 py-6 sm:px-8 sm:py-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                About Creator
              </p>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
                {profile.bio ||
                  "No creator description has been added yet."}
              </p>

              {/* Social quick links */}
              <div className="mt-5 flex flex-wrap gap-3">

                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FiInstagram size={17} />
                    Instagram
                    <FiExternalLink size={13} />
                  </a>
                )}

                {socials.youtube && (
                  <a
                    href={socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FiYoutube size={17} />
                    YouTube
                    <FiExternalLink size={13} />
                  </a>
                )}

                {socials.twitter && (
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FiTwitter size={17} />
                    Twitter
                    <FiExternalLink size={13} />
                  </a>
                )}

                {socials.tiktok && (
                  <a
                    href={socials.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    TikTok
                    <FiExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* =====================================================
              STATS
          ====================================================== */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              icon={<FiUsers size={19} />}
              value={Number(
                profile.followers || 0
              ).toLocaleString()}
              label="Followers"
            />

            <StatCard
              icon={<FiTrendingUp size={19} />}
              value={`${profile.engagementRate || 0}%`}
              label="Engagement Rate"
            />

            <StatCard
              icon={<FiDollarSign size={19} />}
              value={`₹${Number(
                profile.pricePerPost || 0
              ).toLocaleString()}`}
              label="Price / Post"
            />

            <StatCard
              icon={<FiCheckCircle size={19} />}
              value={
                profile.isVerified
                  ? "Verified"
                  : "Not Verified"
              }
              label="Creator Status"
            />
          </div>

          {/* =====================================================
              ABOUT + PROFILE COMPLETION
          ====================================================== */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.7fr_0.8fr]">

            {/* About */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-slate-900">
                About Creator
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Learn more about this creator.
              </p>

              <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600">
                {profile.bio ||
                  "No creator description has been added yet."}
              </p>
            </div>

            {/* Profile completion */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Profile Completion
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Keep your profile complete
                  </p>
                </div>

                <span className="text-xl font-bold text-blue-600">
                  {profileCompletion}%
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />
              </div>

              <Link
                to="/creator-profile"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                <FiCheckCircle size={16} />
                Complete your profile
              </Link>
            </div>
          </div>

          {/* =====================================================
              CREATOR DETAILS + SOCIAL PRESENCE
          ====================================================== */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.7fr_0.8fr]">

            {/* Creator Details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <h2 className="text-xl font-bold text-slate-900">
                Creator Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Important information about this creator.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <DetailBox
                  label="LOCATION"
                  value={profile.city || "Not specified"}
                  icon={<FiMapPin size={18} />}
                />

                <DetailBox
                  label="LANGUAGE"
                  value={profile.language || "Not specified"}
                  icon={<FiGlobe size={18} />}
                />

                <DetailBox
                  label="FOLLOWERS"
                  value={Number(
                    profile.followers || 0
                  ).toLocaleString()}
                  icon={<FiUsers size={18} />}
                />

                <DetailBox
                  label="PRICE PER POST"
                  value={`₹${Number(
                    profile.pricePerPost || 0
                  ).toLocaleString()}`}
                  icon={<FiDollarSign size={18} />}
                />
              </div>
            </div>

            {/* Social Presence */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <h2 className="text-xl font-bold text-slate-900">
                Social Presence
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Connect with this creator.
              </p>

              <div className="mt-5 space-y-3">

                {socials.instagram && (
                  <SocialItem
                    icon={<FiInstagram size={18} />}
                    label="Instagram"
                    link={socials.instagram}
                  />
                )}

                {socials.youtube && (
                  <SocialItem
                    icon={<FiYoutube size={18} />}
                    label="YouTube"
                    link={socials.youtube}
                  />
                )}

                {socials.twitter && (
                  <SocialItem
                    icon={<FiTwitter size={18} />}
                    label="X / Twitter"
                    link={socials.twitter}
                  />
                )}

                {socials.website && (
                  <SocialItem
                    icon={<FiGlobe size={18} />}
                    label="Website"
                    link={socials.website}
                  />
                )}

                {!socials.instagram &&
                  !socials.youtube &&
                  !socials.twitter &&
                  !socials.website && (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                      <p className="text-sm text-slate-400">
                        No social links added yet.
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* =====================================================
              NICHES
          ====================================================== */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <h2 className="text-xl font-bold text-slate-900">
              Content Niches
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Areas this creator focuses on.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.niches?.length ? (
                profile.niches.map((niche) => (
                  <span
                    key={niche}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                  >
                    {niche}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No niches added yet.
                </p>
              )}
            </div>
          </div>

          {/* =====================================================
              PORTFOLIO
          ====================================================== */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Portfolio
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Selected work and portfolio links.
              </p>
            </div>

            <div className="mt-5">
              {profile.portfolioLinks?.length ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {profile.portfolioLinks.map((link, index) => (
                    <a
                      key={`${link}-${index}`}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FiPlayCircle size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                          Portfolio {index + 1}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-400">
                          {link}
                        </p>
                      </div>

                      <FiExternalLink
                        size={16}
                        className="shrink-0 text-slate-400 group-hover:text-blue-600"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-sm text-slate-400">
                    No portfolio links added yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* =====================================================
              CTA
          ====================================================== */}

<div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white shadow-xl shadow-blue-600/20 sm:p-8">
  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">

    {/* CTA Content */}
    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-100 sm:text-sm">
        Profile visibility
      </p>

      <h2 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
        Keep your creator profile updated
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
        Add your latest work, social links and creator information
        to make your profile more complete.
      </p>
    </div>

    {/* CTA Button */}
    <Link
      to="/creator-profile"
      className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50 sm:w-fit"
    >
      <FiEdit3 size={16} />
      Edit Profile
    </Link>
  </div>
</div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

<p className="mt-4 text-xl font-bold text-slate-900 sm:mt-5 sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({ label, value, icon }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <p className="text-xs font-semibold tracking-wider text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-blue-600">
          {icon}
        </span>

        <p className="text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SOCIAL ITEM
========================================================= */

function SocialItem({ icon, label, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs text-slate-400">
          {link}
        </p>
      </div>

      <FiExternalLink
        size={15}
        className="shrink-0 text-slate-400 transition group-hover:text-blue-600"
      />
    </a>
  );
}

export default CreatorProfileView;