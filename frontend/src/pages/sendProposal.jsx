import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { createProposal } from "../services/proposal";

function SendProposal() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    message: "",
    quotedPrice: "",
    deliveryDays: "",
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

      const response = await createProposal({
        campaignId: campaignId,
        message: formData.message,
        quotedPrice: Number(formData.quotedPrice),
        deliveryDays: Number(formData.deliveryDays),
      });

      console.log("Proposal created:", response.data);

      alert("Proposal sent successfully");

      navigate(`/campaign/${campaignId}`);
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Failed to send proposal"
      );

      alert(
        error.response?.data?.message ||
          "Failed to send proposal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-2xl">

          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-gray-500 hover:text-black"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">
            Send Proposal
          </h1>

          <p className="mt-2 text-gray-500">
            Submit your proposal to the brand.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow"
          >
            {/* Message */}

            <div>
              <label className="mb-2 block font-medium">
                Proposal Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your proposal..."
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Quoted Price */}

            <div>
              <label className="mb-2 block font-medium">
                Your Quoted Price
              </label>

              <input
                type="number"
                name="quotedPrice"
                value={formData.quotedPrice}
                onChange={handleChange}
                placeholder="25000"
                min="0"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Delivery Days */}

            <div>
              <label className="mb-2 block font-medium">
                Delivery Days
              </label>

              <input
                type="number"
                name="deliveryDays"
                value={formData.deliveryDays}
                onChange={handleChange}
                placeholder="7"
                min="1"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Proposal"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SendProposal;