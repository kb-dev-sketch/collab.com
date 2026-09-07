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

  // ==========================================
  // STATE
  // ==========================================

  const [brand, setBrand] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // FETCH BRAND PROFILE
  // ==========================================

  useEffect(() => {
    const fetchBrandProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getbrandProfile();

        console.log("Brand profile response:", response);

        setBrand(response.data);
      } catch (error) {
        console.error(
          "Error fetching brand profile:",
          error
        );

        setError(
          error?.response?.data?.message ||
            "Failed to fetch brand profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrandProfile();
  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <Loader />;
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="flex min-h-screen bg-slate-50">

        <Sidebar />

        <main className="flex flex-1 items-center justify-center p-6">

          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              !
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Unable to load profile
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <div className="mt-6 flex justify-center gap-3">

              <button
                onClick={() => navigate(-1)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Go Back
              </button>

              <button
                onClick={() => window.location.reload()}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Try Again
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }


  // ==========================================
  // PROFILE NOT FOUND
  // ==========================================

  if (!brand) {
    return (
      <div className="flex min-h-screen bg-slate-50">

        <Sidebar />

        <main className="flex flex-1 items-center justify-center p-6">

          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <FiBriefcase className="text-xl" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Brand Profile Not Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create your brand profile to start collaborating
              with creators.
            </p>

            <button
              onClick={() => navigate("/brand-profile")}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Create Profile
            </button>

          </div>

        </main>

      </div>
    );
  }


  // ==========================================
  // SAFE SOCIAL DATA
  // ==========================================

  const instagram = brand.socials?.instagram || "";

  const linkedin = brand.socials?.linkedin || "";

  const twitter = brand.socials?.x || "";


  // ==========================================
  // PROFILE COMPLETION
  // ==========================================

  const profileCompletion =
    brand.profileCompleted === true ? 100 : 70;


  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <Sidebar />


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">


          {/* ==================================
              BACK
          ================================== */}

          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <FiArrowLeft />

            Back
          </button>


          {/* ==================================
              PROFILE HEADER
          ================================== */}

          <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-white/5" />


            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              {/* COMPANY INFO */}

              <div className="flex items-center gap-5">

                {/* LOGO */}

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


                {/* TEXT */}

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h1 className="text-2xl font-bold sm:text-3xl">
                      {brand.companyName}
                    </h1>


                    {brand.isVerified && (
                      <FiCheckCircle className="text-blue-200" />
                    )}

                  </div>


                  <p className="mt-1 text-blue-100">
                    {brand.industry || "Industry not specified"}
                  </p>


                  {brand.location && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-blue-100">

                      <FiMapPin />

                      {brand.location}

                    </div>
                  )}

                </div>

              </div>


              {/* EDIT */}

              <button
                onClick={() => navigate("/brand-profile")}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                <FiEdit3 />

                Edit Profile
              </button>

            </div>

          </section>



          {/* ==================================
              STATS
          ================================== */}

          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">


            {/* CAMPAIGNS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                <FiBriefcase />

              </div>

              <p className="text-2xl font-bold text-slate-900">
                {brand.totalCampaigns ?? 0}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Total Campaigns
              </p>

            </div>


            {/* RATING */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                ★
              </div>

              <p className="text-2xl font-bold text-slate-900">
                {brand.averageRating ?? 0}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Average Rating
              </p>

            </div>


            {/* REVIEWS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                <FiUsers />

              </div>

              <p className="text-2xl font-bold text-slate-900">
                {brand.totalReviews ?? 0}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Reviews
              </p>

            </div>


            {/* VERIFIED */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                <FiCheckCircle />

              </div>

              <p className="text-lg font-bold text-slate-900">

                {brand.isVerified
                  ? "Verified"
                  : "Not Verified"}

              </p>

              <p className="mt-1 text-sm text-slate-500">
                Brand Status
              </p>

            </div>

          </div>



          {/* ==================================
              CONTENT
          ================================== */}

          <div className="grid gap-8 lg:grid-cols-3">


            {/* =================================
                LEFT
            ================================= */}

            <div className="space-y-8 lg:col-span-2">


              {/* =================================
                  ABOUT
              ================================= */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <h2 className="text-xl font-bold text-slate-900">
                  About Company
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Learn more about this brand.
                </p>


                <p className="mt-5 leading-7 text-slate-600">

                  {brand.description ||
                    "No company description has been added yet."}

                </p>

              </section>



              {/* =================================
                  COMPANY DETAILS
              ================================= */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <h2 className="text-xl font-bold text-slate-900">
                  Company Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Important information about your company.
                </p>


                <div className="mt-6 grid gap-5 sm:grid-cols-2">


                  {/* INDUSTRY */}

                  <div className="rounded-xl bg-slate-50 p-4">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Industry
                    </p>

                    <div className="flex items-center gap-2">

                      <FiBriefcase className="text-blue-500" />

                      <p className="font-semibold text-slate-800">
                        {brand.industry || "Not specified"}
                      </p>

                    </div>

                  </div>


                  {/* COMPANY SIZE */}

                  <div className="rounded-xl bg-slate-50 p-4">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Company Size
                    </p>

                    <div className="flex items-center gap-2">

                      <FiUsers className="text-blue-500" />

                      <p className="font-semibold text-slate-800">
                        {brand.companySize || "Not specified"}
                      </p>

                    </div>

                  </div>


                  {/* LOCATION */}

                  <div className="rounded-xl bg-slate-50 p-4">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <div className="flex items-center gap-2">

                      <FiMapPin className="text-blue-500" />

                      <p className="font-semibold text-slate-800">
                        {brand.location || "Not specified"}
                      </p>

                    </div>

                  </div>


                  {/* WEBSITE */}

                  <div className="rounded-xl bg-slate-50 p-4">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Website
                    </p>

                    <div className="flex items-center gap-2">

                      <FiGlobe className="shrink-0 text-blue-500" />

                      {brand.website ? (
                        <a
                          href={brand.website}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate font-semibold text-blue-600 hover:underline"
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



            {/* =================================
                RIGHT
            ================================= */}

            <div className="space-y-8">


              {/* =================================
                  PROFILE COMPLETION
              ================================= */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Profile Completion
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Keep your profile complete
                    </p>

                  </div>


                  <span className="text-lg font-bold text-blue-600">
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


                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600">

                  <FiCheckCircle />

                  {brand.profileCompleted
                    ? "Profile is complete"
                    : "Complete your profile"}

                </div>

              </section>



              {/* =================================
                  SOCIAL PRESENCE
              ================================= */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="font-bold text-slate-900">
                  Social Presence
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Connect with your audience
                </p>


                <div className="mt-5 space-y-3">


                  {/* INSTAGRAM */}

                  {instagram ? (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <FiInstagram />
                      </div>

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-slate-800">
                          Instagram
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          {instagram}
                        </p>

                      </div>

                    </a>
                  ) : (
                    <SocialNotAdded
                      icon={<FiInstagram />}
                      name="Instagram"
                    />
                  )}



                  {/* LINKEDIN */}

                  {linkedin ? (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <FiLinkedin />
                      </div>

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-slate-800">
                          LinkedIn
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          {linkedin}
                        </p>

                      </div>

                    </a>
                  ) : (
                    <SocialNotAdded
                      icon={<FiLinkedin />}
                      name="LinkedIn"
                    />
                  )}



                  {/* X */}

                  {twitter ? (
                    <a
                      href={twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <FiTwitter />
                      </div>

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-slate-800">
                          X / Twitter
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          {twitter}
                        </p>

                      </div>

                    </a>
                  ) : (
                    <SocialNotAdded
                      icon={<FiTwitter />}
                      name="X / Twitter"
                    />
                  )}

                </div>

              </section>



              {/* =================================
                  VERIFICATION
              ================================= */}

              <section className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-100">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">

                    <FiCheckCircle className="text-xl" />

                  </div>


                  <div>

                    <h3 className="font-bold">

                      {brand.isVerified
                        ? "Verified Brand"
                        : "Verification Pending"}

                    </h3>


                    <p className="mt-2 text-sm leading-5 text-blue-100">

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


// ==========================================
// SOCIAL NOT ADDED
// ==========================================

function SocialNotAdded({ icon, name }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
        {icon}
      </div>

      <div>

        <p className="text-sm font-semibold text-slate-700">
          {name}
        </p>

        <p className="text-xs text-slate-400">
          Not connected
        </p>

      </div>

    </div>
  );
}


export default BrandProfileView;