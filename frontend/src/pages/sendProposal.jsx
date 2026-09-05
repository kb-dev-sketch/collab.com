import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { createProposal } from "../services/proposal";

import {
  FiArrowLeft,
  FiArrowRight,
  FiFileText,
  FiDollarSign,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiBriefcase,
  FiInfo,
} from "react-icons/fi";

function SendProposal() {
  const { campaignId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    message: "",
    quotedPrice: "",
    deliveryDays: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("");

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

      setError(
        error.response?.data?.message ||
          "Failed to send proposal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-5xl p-5 sm:p-6 lg:p-10">

          {/* ================= BACK ================= */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <FiArrowLeft size={16} />
            Back to Campaign
          </button>


          {/* ================= HERO ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8 lg:p-10">

            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                  <FiSend size={14} />
                  Creator Proposal
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Send Your Proposal
                </h1>

                <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
                  Show the brand why you are the right creator for this
                  campaign. Keep your proposal clear, professional, and
                  aligned with the campaign requirements.
                </p>

              </div>


              {/* Hero Card */}
              <div className="w-full max-w-xs rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700 shadow-md">
                    <FiBriefcase size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-blue-100">
                      Applying for
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      Campaign Opportunity
                    </p>
                  </div>

                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-blue-100">
                  <FiCheckCircle size={14} />
                  Your proposal will be reviewed by the brand
                </div>

              </div>

            </div>
          </section>


          {/* ================= ERROR ================= */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-500">
                  <FiInfo size={17} />
                </div>

                <div>
                  <h3 className="font-semibold text-red-800">
                    Proposal could not be sent
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-red-600">
                    {error}
                  </p>
                </div>

              </div>

            </div>
          )}


          {/* ================= FORM AREA ================= */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">

            {/* ================= LEFT FORM ================= */}
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8"
            >

              {/* Form header */}
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiFileText size={19} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Proposal Details
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Share your idea, pricing, and expected delivery time.
                  </p>
                </div>

              </div>


              {/* ================= MESSAGE ================= */}
              <div className="mt-8">

                <div className="mb-2 flex items-center justify-between">

                  <label className="block text-sm font-semibold text-slate-800">
                    Proposal Message
                  </label>

                  <span className="text-xs text-slate-400">
                    Required
                  </span>

                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Introduce yourself, explain your content approach, mention relevant experience, and tell the brand how you can help achieve the campaign goals..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  required
                />

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Tip: Mention your niche, audience, content style, and why
                  you are a good match for this campaign.
                </p>

              </div>


              {/* ================= PRICE + DELIVERY ================= */}
              <div className="mt-7 grid gap-5 md:grid-cols-2">

                {/* Price */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Your Quoted Price
                  </label>

                  <div className="relative">

                    <FiDollarSign
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                    />

                    <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="quotedPrice"
                      value={formData.quotedPrice}
                      onChange={handleChange}
                      placeholder="25000"
                      min="0"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-18 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Enter the amount you expect for the collaboration.
                  </p>

                </div>


                {/* Delivery */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Delivery Time
                  </label>

                  <div className="relative">

                    <FiClock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                    />

                    <input
                      type="number"
                      name="deliveryDays"
                      value={formData.deliveryDays}
                      onChange={handleChange}
                      placeholder="7"
                      min="1"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-16 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      required
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                      days
                    </span>

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Mention how quickly you can complete the deliverables.
                  </p>

                </div>

              </div>


              {/* ================= SUBMIT ================= */}
              <div className="mt-8 border-t border-blue-100 pt-6">

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending Proposal...
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send Proposal
                      <FiArrowRight size={17} />
                    </>
                  )}

                </button>

              </div>

            </form>


            {/* ================= RIGHT SIDEBAR ================= */}
            <aside className="space-y-6">

              {/* Why Apply */}
              <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FiCheckCircle size={18} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    Make Your Proposal Stand Out
                  </h3>

                </div>

                <div className="mt-5 space-y-4">

                  <Tip
                    number="01"
                    title="Be specific"
                    text="Explain exactly what you can create for the brand."
                  />

                  <Tip
                    number="02"
                    title="Show your value"
                    text="Mention your audience, niche, and relevant experience."
                  />

                  <Tip
                    number="03"
                    title="Be realistic"
                    text="Give a fair price and a delivery timeline you can meet."
                  />

                </div>

              </div>


              {/* Proposal Summary */}
              <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm">

                <h3 className="text-lg font-bold text-slate-900">
                  Proposal Summary
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Review your information before submitting.
                </p>


                <div className="mt-5 space-y-4">

                  <SummaryRow
                    icon={<FiDollarSign />}
                    label="Quoted Price"
                    value={
                      formData.quotedPrice
                        ? `₹${formData.quotedPrice}`
                        : "Not added"
                    }
                  />

                  <SummaryRow
                    icon={<FiClock />}
                    label="Delivery"
                    value={
                      formData.deliveryDays
                        ? `${formData.deliveryDays} days`
                        : "Not added"
                    }
                  />

                  <SummaryRow
                    icon={<FiFileText />}
                    label="Message"
                    value={
                      formData.message.trim()
                        ? "Added"
                        : "Not added"
                    }
                  />

                </div>

              </div>


              {/* Secure Notice */}
              <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <FiInfo size={17} />
                  </div>

                  <div>

                    <h3 className="text-sm font-bold text-slate-900">
                      Before you submit
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Make sure your quoted price and delivery timeline are
                      accurate. The brand will review your proposal before
                      accepting it.
                    </p>

                  </div>

                </div>

              </div>

            </aside>

          </div>


          {/* ================= BOTTOM ================= */}
          <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">

            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-medium text-blue-100">
                  CollabConnect
                </p>

                <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                  Your next collaboration could start here.
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  Make your proposal clear, confident, and professional.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
              >
                <FiArrowLeft size={17} />
                Back
              </button>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}


/* ========================================================= */
/* TIP */
/* ========================================================= */

function Tip({ number, title, text }) {
  return (
    <div className="flex gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-[10px] font-bold text-white">
        {number}
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-900">
          {title}
        </h4>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>

    </div>
  );
}


/* ========================================================= */
/* SUMMARY ROW */
/* ========================================================= */

function SummaryRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-blue-100 pb-3 last:border-0 last:pb-0">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
          {icon}
        </div>

        <span className="text-sm text-slate-500">
          {label}
        </span>

      </div>

      <span className="text-sm font-semibold text-slate-800">
        {value}
      </span>

    </div>
  );
}

export default SendProposal;