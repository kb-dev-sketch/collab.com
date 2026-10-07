import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiActivity,
  FiBriefcase,
  FiMessageSquare,
  FiTarget,
} from "react-icons/fi";

import { loginUser } from "../services/auth";
import { getCreatorProfile } from "../services/creator.js";
import { getbrandProfile } from "../services/brand.js";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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

      const data = await loginUser(formData);

      console.log("Login successful:", data);

      localStorage.setItem(
        "accessToken",
        data.data.accessToken,
      );

      localStorage.setItem(
        "refreshToken",
        data.data.refreshToken,
      );

      const loggedInUser = data.data.user;

      setUser(loggedInUser);

      alert("Login Successful");

      if (loggedInUser.role === "creator") {
        try {
          await getCreatorProfile();
          navigate("/creator-dashboard");
        } catch (error) {
          if (error.response?.status === 404) {
            navigate("/creator-profile");
          } else {
            console.error(error);
            alert("Something went wrong");
          }
        }
      } else if (loggedInUser.role === "brand") {
        try {
          await getbrandProfile();
          navigate("/brand-dashboard");
        } catch (error) {
          if (error.response?.status === 404) {
            navigate("/brand-profile");
          } else {
            console.error(error);
            alert("Something went wrong");
          }
        }
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Login failed",
      );

      alert(
        error.response?.data?.message || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-slate-50
        px-4 py-8
        sm:px-6 sm:py-10
      "
    >
      {/* Background */}
      <div
        className="
          absolute -left-40 top-10
          h-72 w-72
          rounded-full bg-blue-100
          blur-3xl
          sm:h-96 sm:w-96
        "
      />

      <div
        className="
          absolute -right-40 bottom-10
          h-72 w-72
          rounded-full bg-blue-200/40
          blur-3xl
          sm:h-96 sm:w-96
        "
      />

      <div
        className="
          relative grid w-full
          max-w-6xl items-center
          gap-10 lg:grid-cols-2
          lg:gap-14
        "
      >
        {/* Desktop Left Side */}
        <div className="hidden lg:block">
          <div className="mb-10 flex items-center gap-3">
            <div
              className="
                flex h-12 w-12
                shrink-0 items-center
                justify-center rounded-xl
                bg-blue-600 font-bold
                text-white
                shadow-lg shadow-blue-200
              "
            >
              CC
            </div>

            <div>
              <h1
                className="
                  text-2xl font-bold
                  text-slate-900
                "
              >
                CollabConnect
              </h1>

              <p className="text-sm text-slate-500">
                Influencer × Brand Collaboration
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <span
              className="
                inline-flex rounded-full
                bg-blue-50 px-4 py-2
                text-sm font-semibold
                text-blue-600
              "
            >
              Welcome back
            </span>

            <h2
              className="
                mt-6 text-4xl font-extrabold
                leading-tight tracking-tight
                text-slate-900 xl:text-5xl
              "
            >
              Connect.
              <span className="text-blue-600">
                {" "}Collaborate.
              </span>
              <br />
              Grow together.
            </h2>

            <p
              className="
                mt-5 text-lg
                leading-8 text-slate-600
              "
            >
              Manage campaigns, discover opportunities,
              connect with partners and build meaningful
              collaborations from one platform.
            </p>
          </div>

          {/* Feature Cards */}
          <div
            className="
              mt-10 grid max-w-xl
              grid-cols-2 gap-4
            "
          >
            <FeatureCard
              icon={<FiBriefcase />}
              title="Smart Campaigns"
              text="Discover and manage campaigns easily."
            />

            <FeatureCard
              icon={<FiMessageSquare />}
              title="Real-time Chat"
              text="Collaborate instantly with partners."
            />

            <FeatureCard
              icon={<FiTarget />}
              title="Better Matches"
              text="Find the right brand or influencer."
            />

            <FeatureCard
              icon={<FiActivity />}
              title="Stay Updated"
              text="Never miss important updates."
            />
          </div>

          {/* Stats */}
          <div
            className="
              mt-8 flex items-center
              gap-6 border-t
              border-slate-200 pt-7
              sm:gap-8
            "
          >
            <Stat value="1000+" label="Influencers" />

            <div
              className="
                h-8 w-px
                shrink-0 bg-slate-200
              "
            />

            <Stat value="500+" label="Brands" />

            <div
              className="
                h-8 w-px
                shrink-0 bg-slate-200
              "
            />

            <Stat value="2000+" label="Campaigns" />
          </div>
        </div>

        {/* Login Section */}
        <div className="w-full">
          {/* Mobile Logo */}
          <div
            className="
              mb-6 flex
              items-center justify-center
              gap-3 lg:hidden
            "
          >
            <div
              className="
                flex h-10 w-10
                shrink-0 items-center
                justify-center rounded-xl
                bg-blue-600 font-bold
                text-white shadow-lg
                sm:h-11 sm:w-11
              "
            >
              CC
            </div>

            <span
              className="
                text-xl font-bold
                text-slate-900
                sm:text-2xl
              "
            >
              CollabConnect
            </span>
          </div>

          {/* Login Card */}
          <div
            className="
              mx-auto w-full max-w-md
              rounded-3xl
              border border-slate-100
              bg-white p-6
              shadow-2xl shadow-slate-200/70
              sm:p-8 md:p-10
            "
          >
            {/* Heading */}
            <div className="text-center">
              <h1
                className="
                  text-2xl font-extrabold
                  tracking-tight text-slate-900
                  sm:text-3xl
                "
              >
                Welcome back
              </h1>

              <p
                className="
                  mt-2 text-sm
                  leading-6 text-slate-500
                "
              >
                Login to continue your collaboration journey.
              </p>
            </div>

            {/* Form */}
            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Username */}
              <div>
                <label
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-700
                  "
                >
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-slate-50 px-4 py-3.5
                    text-slate-900 outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-700
                  "
                >
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-slate-50 px-4 py-3.5
                    text-slate-900 outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>

              {/* Password */}
              <div>
                <div
                  className="
                    mb-2 flex items-center
                    justify-between gap-3
                  "
                >
                  <label
                    className="
                      block text-sm
                      font-semibold text-slate-700
                    "
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="
                      shrink-0 text-xs
                      font-semibold
                      text-blue-600
                      hover:text-blue-700
                    "
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-slate-50 px-4 py-3.5
                    text-slate-900 outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="
                    h-4 w-4 rounded
                    border-slate-300
                    text-blue-600
                    focus:ring-blue-500
                  "
                />

                <label
                  htmlFor="remember"
                  className="
                    text-sm text-slate-500
                  "
                >
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full rounded-xl
                  bg-blue-600 py-3.5
                  font-semibold text-white
                  shadow-lg shadow-blue-200
                  transition
                  hover:-translate-y-0.5
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            {/* Signup Divider */}
            <div
              className="
                my-7 flex
                items-center gap-3
              "
            >
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p
              className="
                text-center
                text-sm text-slate-500
              "
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="
                  font-semibold
                  text-blue-600
                  hover:text-blue-700
                "
              >
                Create an account
              </Link>
            </p>
          </div>

          <p
            className="
              mt-6 text-center
              text-xs text-slate-400
            "
          >
            © 2026 CollabConnect
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div
      className="
        rounded-2xl
        border border-slate-100
        bg-white p-5
        shadow-sm
      "
    >
      <div
        className="
          flex h-11 w-11
          items-center justify-center
          rounded-xl
          bg-blue-50
          text-xl text-blue-600
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-4 font-bold
          text-slate-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1 text-sm
          leading-5 text-slate-500
        "
      >
        {text}
      </p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="min-w-0">
      <p
        className="
          text-xl font-bold
          text-slate-900 sm:text-2xl
        "
      >
        {value}
      </p>

      <p className="text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default Login;