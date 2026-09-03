import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden">
        {/* Background decoration */}

        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-16 lg:flex-row lg:px-10 lg:py-20">

          {/* LEFT */}

          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Connect. Collaborate. Grow.
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Connect Brands with
              <span className="block text-blue-600">
                Influencers 🚀
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Find the right influencers, launch powerful
              campaigns, send proposals and collaborate in
              real time — all from one platform.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/Signup")}
                className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Join as Creator
              </button>

              <button
                onClick={() => navigate("/Signup")}
                className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Join as Brand
              </button>
            </div>

            {/* Mini trust row */}

            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-slate-500">
              <div>
                <p className="font-bold text-slate-900">
                  1000+
                </p>
                <p>Creators</p>
              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div>
                <p className="font-bold text-slate-900">
                  500+
                </p>
                <p>Brands</p>
              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div>
                <p className="font-bold text-slate-900">
                  2000+
                </p>
                <p>Campaigns</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative flex w-full max-w-xl items-center justify-center">
            <div className="relative flex h-[360px] w-[360px] items-center justify-center rounded-full bg-blue-100 shadow-inner sm:h-[430px] sm:w-[430px]">

              <div className="absolute inset-8 rounded-full border border-blue-200" />
              <div className="absolute inset-16 rounded-full border border-blue-300" />

              <div className="relative flex h-48 w-48 items-center justify-center rounded-3xl bg-white shadow-2xl">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-600 text-4xl font-extrabold text-white shadow-lg">
                  CC
                </div>
              </div>

              {/* Floating cards */}

              <div className="absolute -left-2 top-10 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-8">
                <p className="text-xs text-slate-500">
                  Campaign
                </p>
                <p className="font-bold text-slate-900">
                  Live 🚀
                </p>
              </div>

              <div className="absolute -right-2 bottom-12 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-8">
                <p className="text-xs text-slate-500">
                  Collaboration
                </p>
                <p className="font-bold text-blue-600">
                  Active ✓
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="bg-white px-6 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Features
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Everything you need to collaborate
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              A complete platform for modern influencer
              marketing.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                📢
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Create Campaigns
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Brands can create, manage and track campaigns
                from one place.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                📨
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Send Proposals
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Influencers can discover campaigns and send
                tailored proposals.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                💬
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Real-time Chat
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Communicate instantly and manage
                collaborations in real time.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🔔
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Notifications
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Never miss proposals, messages or campaign
                updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="bg-slate-50 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              How it works
            </span>

            <h2 className="mt-3 text-4xl font-bold">
              Collaborate in 4 simple steps
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                icon: "📢",
                title: "Create Campaign",
                text: "Brands publish campaigns with requirements and deliverables.",
              },
              {
                number: "02",
                icon: "📨",
                title: "Send Proposal",
                text: "Influencers discover relevant campaigns and apply.",
              },
              {
                number: "03",
                icon: "✅",
                title: "Accept Proposal",
                text: "Brands review proposals and select the right influencer.",
              },
              {
                number: "04",
                icon: "💬",
                title: "Start Collaboration",
                text: "Chat in real time and manage the collaboration.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl bg-white p-7 shadow-sm"
              >
                <span className="text-sm font-bold text-blue-600">
                  {step.number}
                </span>

                <div className="mt-5 text-4xl">
                  {step.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}

      <section className="bg-blue-600 px-6 py-20 text-white lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 text-center lg:grid-cols-4">
          <div>
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              1000+
            </h2>
            <p className="mt-2 text-blue-100">
              Creators
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              500+
            </h2>
            <p className="mt-2 text-blue-100">
              Brands
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              2000+
            </h2>
            <p className="mt-2 text-blue-100">
              Campaigns
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              50K+
            </h2>
            <p className="mt-2 text-blue-100">
              Messages
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Testimonials
            </span>

            <h2 className="mt-3 text-4xl font-bold">
              What people say
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
              <div className="mb-5 text-3xl">💙</div>

              <p className="leading-7 text-slate-600">
                "Amazing platform! We found the perfect creator
                in just a few days."
              </p>

              <h3 className="mt-6 font-bold">
                Nike
              </h3>

              <p className="text-sm text-slate-500">
                Brand
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
              <div className="mb-5 text-3xl">✨</div>

              <p className="leading-7 text-slate-600">
                "Collaboration with brands has become super
                easy."
              </p>

              <h3 className="mt-6 font-bold">
                Influencer
              </h3>

              <p className="text-sm text-slate-500">
                Creator
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
              <div className="mb-5 text-3xl">🚀</div>

              <p className="leading-7 text-slate-600">
                "Real-time chat and notifications are awesome."
              </p>

              <h3 className="mt-6 font-bold">
                Samsung
              </h3>

              <p className="text-sm text-slate-500">
                Brand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-blue-600 px-8 py-14 text-center text-white shadow-xl sm:px-14">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold">
              Ready to start collaborating?
            </h2>

            <p className="mt-4 text-lg text-blue-100">
              Join CollabConnect and build your next great
              brand partnership.
            </p>

            <button
              onClick={() => navigate("/Signup")}
              className="mt-8 rounded-xl bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;