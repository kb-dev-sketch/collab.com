import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/auth";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "creator",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await registerUser(formData);

      console.log("Registration successful:", response);

      alert("Registration successful! Please login.");

      navigate("/login");
    } catch (error) {
      console.log(
        error.response?.data?.message ||
          "Registration failed"
      );

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Background */}

      <div className="relative overflow-hidden">

        {/* Decorative blobs */}

        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10 lg:px-10">

          <div className="grid w-full items-center gap-14 lg:grid-cols-2">

            {/* ================= LEFT JOURNEY ================= */}

            <div className="hidden lg:block">

              {/* Logo */}

              <div className="mb-10 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200">
                  CC
                </div>

                <div>
                  <h1 className="text-2xl font-bold">
                    CollabConnect
                  </h1>

                  <p className="text-sm text-slate-500">
                    Influencer × Brand Collaboration
                  </p>
                </div>
              </div>

              {/* Heading */}

              <div className="max-w-xl">

                <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                  Your collaboration journey starts here
                </span>

                <h2 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900">
                  From your first
                  <span className="text-blue-600">
                    {" "}
                    connection
                  </span>
                  <br />
                  to your next
                  <span className="text-blue-600">
                    {" "}
                    collaboration.
                  </span>
                </h2>

                <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
                  Build your profile, discover the right
                  opportunities, connect with partners and
                  collaborate seamlessly.
                </p>

              </div>

              {/* Journey */}

              <div className="relative mt-10">

                {/* Vertical line */}

                <div className="absolute left-5 top-5 h-[calc(100%-40px)] w-px bg-blue-200" />

                <div className="space-y-7">

                  {/* Step 1 */}

                  <div className="relative flex gap-5">

                    <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg shadow-blue-200">
                      01
                    </div>

                    <div className="pt-1">
                      <h3 className="font-bold text-slate-900">
                        Create your account
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Choose whether you're an Influencer or
                        Brand.
                      </p>
                    </div>

                  </div>

                  {/* Step 2 */}

                  <div className="relative flex gap-5">

                    <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-blue-600 ring-2 ring-blue-200">
                      02
                    </div>

                    <div className="pt-1">
                      <h3 className="font-bold text-slate-900">
                        Complete your profile
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Showcase your skills, niche and
                        collaboration goals.
                      </p>
                    </div>

                  </div>

                  {/* Step 3 */}

                  <div className="relative flex gap-5">

                    <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-blue-600 ring-2 ring-blue-200">
                      03
                    </div>

                    <div className="pt-1">
                      <h3 className="font-bold text-slate-900">
                        Discover opportunities
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Find campaigns and partners that match
                        your goals.
                      </p>
                    </div>

                  </div>

                  {/* Step 4 */}

                  <div className="relative flex gap-5">

                    <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-blue-600 ring-2 ring-blue-200">
                      04
                    </div>

                    <div className="pt-1">
                      <h3 className="font-bold text-slate-900">
                        Collaborate & grow
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Send proposals, chat in real time and
                        build long-term partnerships.
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* Bottom stats */}

              <div className="mt-10 flex gap-8 border-t border-slate-200 pt-7">

                <div>
                  <p className="text-2xl font-bold">
                    1000+
                  </p>
                  <p className="text-sm text-slate-500">
                    Influencers
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    500+
                  </p>
                  <p className="text-sm text-slate-500">
                    Brands
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    2000+
                  </p>
                  <p className="text-sm text-slate-500">
                    Campaigns
                  </p>
                </div>

              </div>

            </div>

            {/* ================= SIGNUP CARD ================= */}

            <div className="w-full">

              {/* Mobile logo */}

              <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                  CC
                </div>

                <span className="text-2xl font-bold">
                  CollabConnect
                </span>

              </div>

              <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/70 sm:p-10">

                {/* Header */}

                <div className="text-center">

                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                    🚀
                  </div>

                  <h1 className="text-3xl font-extrabold">
                    Create your account
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Join CollabConnect and start your
                    collaboration journey.
                  </p>

                </div>

                {/* Form */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >

                  {/* Username */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Username
                    </label>

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {/* Password */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {/* Role */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Join as
                    </label>

                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="creator">
                        Influencer / Creator
                      </option>

                      <option value="brand">
                        Brand
                      </option>
                    </select>
                  </div>

                  {/* Role info */}

                  <div className="rounded-xl bg-blue-50 p-4">

                    {formData.role === "creator" ? (
                      <>
                        <p className="font-semibold text-blue-700">
                          You're joining as an Influencer
                        </p>

                        <p className="mt-1 text-sm text-blue-600">
                          Discover campaigns and collaborate
                          with brands.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-blue-700">
                          You're joining as a Brand
                        </p>

                        <p className="mt-1 text-sm text-blue-600">
                          Create campaigns and connect with
                          influencers.
                        </p>
                      </>
                    )}

                  </div>

                  {/* Button */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Creating Account..."
                      : "Create Account"}
                  </button>

                </form>

                {/* Login */}

                <p className="mt-7 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Login
                  </Link>
                </p>

              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                © 2026 CollabConnect
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;