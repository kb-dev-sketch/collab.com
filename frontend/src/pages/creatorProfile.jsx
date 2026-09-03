import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { createCreatorProfile } from "../services/creator";

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

  // Normal fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Social fields
  const handleSocialChange = (e) => {
    setFormData({
      ...formData,
      socials: {
        ...formData.socials,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Niches
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

  // Portfolio
  const addPortfolioLink = () => {
    if (!portfolioLink.trim()) {
      return;
    }

    setFormData({
      ...formData,
      portfolioLinks: [
        ...formData.portfolioLinks,
        portfolioLink,
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

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await createCreatorProfile(formData);

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">

          <h1 className="text-3xl font-bold">
            Create Creator Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your profile so brands can discover you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-2xl bg-white p-8 shadow"
          >

            {/* Name */}

            <div>
              <label className="mb-2 block font-medium">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Bio */}

            <div>
              <label className="mb-2 block font-medium">
                Bio
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell brands about yourself..."
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* City */}

            <div>
              <label className="mb-2 block font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Delhi"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Language */}

            <div>
              <label className="mb-2 block font-medium">
                Language
              </label>

              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder="Hindi, English"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Profile Image */}

            <div>
              <label className="mb-2 block font-medium">
                Profile Image URL
              </label>

              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Niches */}

            <div>
              <label className="mb-3 block font-medium">
                Niches
              </label>

              <div className="flex flex-wrap gap-4">
                {[
                  "technology",
          "gaming",
          "Education",
          "Fitness",
          "fashion",
          "finance",
          "Travel",
          "Food",
          "LifeStyle",
          "Business",
          "Entertainment",
                ].map((niche) => (
                  <label
                    key={niche}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={niche}
                      checked={formData.niches.includes(
                        niche
                      )}
                      onChange={handleNicheChange}
                    />

                    {niche}
                  </label>
                ))}
              </div>
            </div>

            {/* Socials */}

            <div>
              <h2 className="mb-4 text-xl font-semibold">
                Social Media
              </h2>

              <div className="grid gap-4 md:grid-cols-2">

                <input
                  type="text"
                  name="instagram"
                  value={formData.socials.instagram}
                  onChange={handleSocialChange}
                  placeholder="Instagram"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  name="youtube"
                  value={formData.socials.youtube}
                  onChange={handleSocialChange}
                  placeholder="YouTube"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  name="twitter"
                  value={formData.socials.twitter}
                  onChange={handleSocialChange}
                  placeholder="Twitter"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  name="tiktok"
                  value={formData.socials.tiktok}
                  onChange={handleSocialChange}
                  placeholder="TikTok"
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  name="website"
                  value={formData.socials.website}
                  onChange={handleSocialChange}
                  placeholder="Website"
                  className="rounded-lg border p-3 md:col-span-2"
                />

              </div>
            </div>

            {/* Stats */}

            <div>
              <h2 className="mb-4 text-xl font-semibold">
                Audience Information
              </h2>

              <div className="grid gap-4 md:grid-cols-3">

                <input
                  type="number"
                  name="followers"
                  value={formData.followers}
                  onChange={handleChange}
                  placeholder="Followers"
                  min="0"
                  className="rounded-lg border p-3"
                />

                <input
                  type="number"
                  name="engagementRate"
                  value={formData.engagementRate}
                  onChange={handleChange}
                  placeholder="Engagement Rate %"
                  min="0"
                  className="rounded-lg border p-3"
                />

                <input
                  type="number"
                  name="pricePerPost"
                  value={formData.pricePerPost}
                  onChange={handleChange}
                  placeholder="Price Per Post"
                  min="0"
                  className="rounded-lg border p-3"
                />

              </div>
            </div>

            {/* Portfolio */}

            <div>
              <h2 className="mb-4 text-xl font-semibold">
                Portfolio Links
              </h2>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={portfolioLink}
                  onChange={(e) =>
                    setPortfolioLink(e.target.value)
                  }
                  placeholder="https://yourportfolio.com"
                  className="flex-1 rounded-lg border p-3"
                />

                <button
                  type="button"
                  onClick={addPortfolioLink}
                  className="rounded-lg bg-gray-800 px-5 py-3 text-white"
                >
                  Add
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {formData.portfolioLinks.map(
                  (link, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <span className="truncate">
                        {link}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removePortfolioLink(index)
                        }
                        className="ml-4 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Creating Profile..."
                : "Create Profile"}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}

export default CreatorProfile;