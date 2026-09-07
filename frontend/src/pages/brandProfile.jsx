import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiChevronDown,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiTwitter,
  FiUpload,
  FiUsers,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import { createBrandProfile } from "../services/brand";


// ======================================================
// CUSTOM SELECT COMPONENT
// ======================================================

function CustomSelect({
  label,
  value,
  options,
  placeholder,
  icon: Icon,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-left shadow-sm transition-all duration-200 ${
          open
            ? "border-blue-500 ring-4 ring-blue-100"
            : "border-slate-200 hover:border-blue-300"
        }`}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon
              className={`text-lg ${
                value ? "text-blue-600" : "text-slate-400"
              }`}
            />
          )}

          <span
            className={
              value
                ? "font-medium text-slate-800"
                : "text-slate-400"
            }
          >
            {value || placeholder}
          </span>
        </div>

        <FiChevronDown
          className={`text-lg text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl">
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => {
              const selected = value === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <span>{option}</span>

                  {selected && (
                    <FiCheck className="text-base text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


// ======================================================
// MAIN COMPONENT
// ======================================================

function BrandProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    logo: "",
    industry: "",
    website: "",
    description: "",
    companySize: "1-10",
    location: "",
    socials: {
      instagram: "",
      linkedin: "",
      x: "",
    },
  });


  // ======================================================
  // INDUSTRY OPTIONS
  // ======================================================

  const industryOptions = [
    "Technology",
    "Fashion",
    "Food",
    "Travel",
    "Finance",
    "Educating",
    "Gaming",
    "Healthcare",
    "Beauty",
    "Lifestyle",
    "other",
  ];


  // ======================================================
  // COMPANY SIZE OPTIONS
  // ======================================================

  const companySizeOptions = [
    "1-10",
    "11-50",
    "51-100",
    "201-500",
    "500+",
  ];


  // ======================================================
  // HANDLE NORMAL INPUT
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ======================================================
  // HANDLE SOCIAL INPUT
  // ======================================================

  const handleSocialChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [name]: value,
      },
    }));
  };


  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createBrandProfile(formData);

      alert("Brand profile created successfully!");

      navigate("/brand-dashboard");
    } catch (error) {
      console.error("Create brand profile error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to create brand profile"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <Sidebar />


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">


          {/* ==================================================
              BACK BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <FiArrowLeft />

            Back
          </button>


          {/* ==================================================
              HERO SECTION
          ================================================== */}

          <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">

            {/* Decorative circles */}

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 right-20 h-40 w-40 rounded-full bg-white/5" />


            <div className="relative max-w-3xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                <FiBriefcase />

                Brand Profile
              </div>


              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Build your brand presence
              </h1>


              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Tell creators about your company, industry and brand.
                A complete profile helps creators understand your business
                before collaborating with you.
              </p>

            </div>

          </section>



          {/* ==================================================
              CONTENT GRID
          ================================================== */}

          <div className="grid gap-8 lg:grid-cols-3">


            {/* ==================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-8 lg:col-span-2"
            >


              {/* ==================================================
                  COMPANY INFORMATION
              ================================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-6">

                  <h2 className="text-xl font-bold text-slate-900">
                    Company Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Basic information about your company.
                  </p>

                </div>


                <div className="grid gap-5 sm:grid-cols-2">


                  {/* Company Name */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Company Name
                    </label>

                    <div className="relative">

                      <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                    </div>

                  </div>



                  {/* Website */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Website
                    </label>

                    <div className="relative">

                      <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                    </div>

                  </div>



                  {/* Location */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location
                    </label>

                    <div className="relative">

                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Delhi, India"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                    </div>

                  </div>



                  {/* Industry */}

                  <CustomSelect
                    label="Industry"
                    value={formData.industry}
                    placeholder="Select industry"
                    options={industryOptions}
                    icon={FiBriefcase}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        industry: value,
                      }))
                    }
                  />



                  {/* Company Size */}

                  <CustomSelect
                    label="Company Size"
                    value={formData.companySize}
                    placeholder="Select company size"
                    options={companySizeOptions}
                    icon={FiUsers}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        companySize: value,
                      }))
                    }
                  />



                  {/* Logo */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Company Logo URL
                    </label>

                    <div className="relative">

                      <FiUpload className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="url"
                        name="logo"
                        value={formData.logo}
                        onChange={handleChange}
                        placeholder="https://example.com/logo.png"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Paste a publicly accessible image URL.
                    </p>

                  </div>



                  {/* Description */}

                  <div className="sm:col-span-2">

                    <div className="mb-2 flex items-center justify-between">

                      <label className="text-sm font-semibold text-slate-700">
                        Company Description
                      </label>

                      <span className="text-xs text-slate-400">
                        {formData.description.length}/1000
                      </span>

                    </div>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      maxLength={1000}
                      rows={5}
                      placeholder="Tell creators about your company, products, mission and what your brand stands for..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>

              </section>



              {/* ==================================================
                  SOCIAL MEDIA
              ================================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-6">

                  <h2 className="text-xl font-bold text-slate-900">
                    Social Presence
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add your company's social media profiles.
                  </p>

                </div>


                <div className="space-y-5">


                  {/* Instagram */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Instagram
                    </label>

                    <div className="relative">

                      <FiInstagram className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="instagram"
                        value={formData.socials.instagram}
                        onChange={handleSocialChange}
                        placeholder="https://instagram.com/yourbrand"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                    </div>

                  </div>



                  {/* LinkedIn */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      LinkedIn
                    </label>

                    <div className="relative">

                      <FiLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="linkedin"
                        value={formData.socials.linkedin}
                        onChange={handleSocialChange}
                        placeholder="https://linkedin.com/company/yourbrand"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                    </div>

                  </div>



                  {/* X */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      X / Twitter
                    </label>

                    <div className="relative">

                      <FiTwitter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        name="x"
                        value={formData.socials.x}
                        onChange={handleSocialChange}
                        placeholder="https://x.com/yourbrand"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                    </div>

                  </div>

                </div>

              </section>



              {/* ==================================================
                  SUBMIT
              ================================================== */}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Creating Profile...
                    </>
                  ) : (
                    <>
                      Create Brand Profile

                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

              </div>

            </form>



            {/* ==================================================
                LIVE PREVIEW
            ================================================== */}

            <aside className="lg:col-span-1">

              <div className="sticky top-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


                {/* Preview Header */}

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">

                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                    Live Preview
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    How creators will see you
                  </h3>

                </div>



                {/* Preview Body */}

                <div className="p-6">


                  {/* Logo */}

                  <div className="mb-5 flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                      {formData.logo ? (
                        <img
                          src={formData.logo}
                          alt="Company logo"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FiBriefcase className="text-2xl text-slate-300" />
                      )}

                    </div>


                    <div className="min-w-0">

                      <h4 className="truncate text-lg font-bold text-slate-900">
                        {formData.companyName || "Your Company"}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {formData.industry || "Industry"}
                      </p>

                    </div>

                  </div>



                  {/* Description */}

                  <div className="mb-5">

                    <p className="text-sm leading-6 text-slate-600">
                      {formData.description ||
                        "Your company description will appear here. Tell creators what makes your brand unique."}
                    </p>

                  </div>



                  {/* Details */}

                  <div className="space-y-3 border-t border-slate-100 pt-5">


                    {formData.website && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">

                        <FiGlobe className="shrink-0 text-blue-500" />

                        <span className="truncate">
                          {formData.website}
                        </span>

                      </div>
                    )}



                    {formData.location && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">

                        <FiMapPin className="shrink-0 text-blue-500" />

                        <span>
                          {formData.location}
                        </span>

                      </div>
                    )}



                    <div className="flex items-center gap-3 text-sm text-slate-600">

                      <FiUsers className="shrink-0 text-blue-500" />

                      <span>
                        {formData.companySize || "Company size"}
                      </span>

                    </div>

                  </div>



                  {/* Socials */}

                  <div className="mt-5 border-t border-slate-100 pt-5">

                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Social Presence
                    </p>


                    <div className="flex gap-2">

                      {formData.socials.instagram && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                          <FiInstagram />
                        </div>
                      )}


                      {formData.socials.linkedin && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                          <FiLinkedin />
                        </div>
                      )}


                      {formData.socials.x && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                          <FiTwitter />
                        </div>
                      )}


                      {!formData.socials.instagram &&
                        !formData.socials.linkedin &&
                        !formData.socials.x && (
                          <span className="text-xs text-slate-400">
                            No social profiles added
                          </span>
                        )}

                    </div>

                  </div>



                  {/* Tip */}

                  <div className="mt-6 rounded-xl bg-blue-50 p-4">

                    <div className="flex gap-3">

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                        i
                      </div>

                      <p className="text-xs leading-5 text-blue-700">
                        A complete brand profile helps creators decide
                        whether your campaign is a good fit for them.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>

    </div>
  );
}

export default BrandProfile;