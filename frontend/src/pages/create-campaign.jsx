import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../services/campaign";
import Sidebar from "../components/Sidebar";

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
        [name]: formData[name].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createCampaign(formData);

      console.log("Created campaign:", response.data);

      alert("Campaign created successfully");

      navigate("/campaigns");
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Failed to create campaign"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">
            Create New Campaign
          </h1>

          <p className="mt-2 text-gray-500">
            Create a campaign and find the right creators.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-2xl bg-white p-8 shadow"
          >
            {/* Title */}

            <div>
              <label className="mb-2 block font-medium">
                Campaign Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Summer Tech Campaign"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your campaign..."
                rows="5"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Budget */}

            <div>
              <label className="mb-2 block font-medium">
                Budget
              </label>

              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="50000"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Requirements */}

            <div>
              <label className="mb-2 block font-medium">
                Requirements
              </label>

              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="What do you expect from the creator?"
                rows="4"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Deliverables */}

            <div>
              <label className="mb-2 block font-medium">
                Deliverables
              </label>

              <textarea
                name="deliverables"
                value={formData.deliverables}
                onChange={handleChange}
                placeholder="Reel, post, story, video..."
                rows="4"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Platforms */}

            <div>
              <p className="mb-3 font-medium">
                Platforms
              </p>

              <div className="flex gap-6">
                {["Instagram", "YouTube", "TikTok"].map(
                  (platform) => (
                    <label
                      key={platform}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        name="platforms"
                        value={platform}
                        checked={formData.platforms.includes(
                          platform
                        )}
                        onChange={handleArrayChange}
                      />

                      {platform}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Niches */}

            <div>
              <p className="mb-3 font-medium">
                Niches
              </p>

              <div className="flex flex-wrap gap-5">
                {[
                  "Technology",
                  "Gaming",
                  "Fashion",
                  "Fitness",
                  "Lifestyle",
                ].map((niche) => (
                  <label
                    key={niche}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      name="niches"
                      value={niche}
                      checked={formData.niches.includes(
                        niche
                      )}
                      onChange={handleArrayChange}
                    />

                    {niche}
                  </label>
                ))}
              </div>
            </div>

            {/* Dates */}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                  required
                />
              </div>
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700"
            >
              Create Campaign
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateCampaign;