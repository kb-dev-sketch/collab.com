import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiBriefcase,
  FiCheckCircle,
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiStar,
  FiTrendingUp,

} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: <FiBriefcase />,
    title: "Create Campaigns",
    text: "Brands can create, manage and track campaigns from one place.",
  },
  {
    icon: <FiSend />,
    title: "Send Proposals",
    text: "Influencers can discover campaigns and send tailored proposals.",
  },
  {
    icon: <FiMessageCircle />,
    title: "Real-time Chat",
    text: "Communicate instantly and manage collaborations in real time.",
  },
  {
    icon: <FiBell />,
    title: "Notifications",
    text: "Never miss proposals, messages or campaign updates.",
  },
];

const steps = [
  {
    number: "01",
    icon: <FiBriefcase />,
    title: "Create Campaign",
    text: "Brands publish campaigns with requirements and deliverables.",
  },
  {
    number: "02",
    icon: <FiSend />,
    title: "Send Proposal",
    text: "Influencers discover relevant campaigns and apply.",
  },
  {
    number: "03",
    icon: <FiCheckCircle />,
    title: "Accept Proposal",
    text: "Brands review proposals and select the right influencer.",
  },
  {
    number: "04",
    icon: <FiMessageCircle />,
    title: "Start Collaboration",
    text: "Chat in real time and manage the collaboration.",
  },
];

const stats = [
  { value: "1000+", label: "Creators" },
  { value: "500+", label: "Brands" },
  { value: "2000+", label: "Campaigns" },
  { value: "50K+", label: "Messages" },
];

const testimonials = [
  {
    icon: <FiHeart />,
    text: "Amazing platform! We found the perfect creator in just a few days.",
    name: "Nike",
    role: "Brand",
  },
  {
    icon: <FiStar />,
    text: "Collaboration with brands has become super easy.",
    name: "Influencer",
    role: "Creator",
  },
  {
    icon: <FiTrendingUp />,
    text: "Real-time chat and notifications are awesome.",
    name: "Samsung",
    role: "Brand",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-center gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:gap-16 lg:px-10 lg:py-20">
          <div className="w-full max-w-2xl text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:px-4 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Connect. Collaborate. Grow.
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Connect Brands with
              <span className="block text-blue-600">Influencers</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl">
              Find the right influencers, launch powerful campaigns, send
              proposals and collaborate in real time — all from one platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={() => navigate("/Signup")}
                className="w-full rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
              >
                Join as Creator
              </button>

              <button
                onClick={() => navigate("/Signup")}
                className="w-full rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
              >
                Join as Brand
              </button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-slate-500 lg:justify-start">
              <Stat value="1000+" label="Creators" />
              <Divider />
              <Stat value="500+" label="Brands" />
              <Divider />
              <Stat value="2000+" label="Campaigns" />
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white px-4 py-16 sm:px-6 lg:px-10">
        <SectionHeading
          label="Features"
          title="Everything you need to collaborate"
          description="A complete platform for modern influencer marketing."
        />

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <SectionHeading
          label="How it works"
          title="Collaborate in 4 simple steps"
        />

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-blue-600 px-4 py-16 text-white sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              light
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <SectionHeading
          label="Testimonials"
          title="What people say"
        />

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3 lg:mt-14">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-blue-600 px-6 py-12 text-center text-white shadow-xl sm:px-10 sm:py-14">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to start collaborating?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100 sm:text-lg">
            Join CollabConnect and build your next great brand partnership.
          </p>

          <button
            onClick={() => navigate("/Signup")}
            className="mt-8 w-full rounded-xl bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 sm:w-auto"
          >
            Get Started
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="flex w-full max-w-xl justify-center">
      <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-blue-100 shadow-inner sm:h-96 sm:w-96 lg:h-[430px] lg:w-[430px]">
        <div className="absolute inset-8 rounded-full border border-blue-200" />
        <div className="absolute inset-16 rounded-full border border-blue-300" />

        <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-white shadow-2xl sm:h-48 sm:w-48">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-extrabold text-white sm:h-24 sm:w-24 sm:text-4xl">
            CC
          </div>
        </div>

        <FloatingCard
          className="left-0 top-6 sm:-left-4 lg:-left-8"
          label="Campaign"
          value="Live"
        />

        <FloatingCard
          className="bottom-6 right-0 sm:-right-4 lg:-right-8"
          label="Collaboration"
          value="Active"
          blue
        />
      </div>
    </div>
  );
}

function FloatingCard({ className, label, value, blue = false }) {
  return (
    <div
      className={`absolute rounded-2xl bg-white px-3 py-2 shadow-xl sm:px-4 sm:py-3 ${className}`}
    >
      <p className="text-[10px] text-slate-500 sm:text-xs">{label}</p>
      <p
        className={`text-sm font-bold sm:text-base ${
          blue ? "text-blue-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SectionHeading({ label, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 sm:text-sm">
        {label}
      </span>

      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 sm:p-7">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
        {text}
      </p>
    </div>
  );
}

function StepCard({ number, icon, title, text }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-7">
      <span className="text-sm font-bold text-blue-600">{number}</span>

      <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
        {text}
      </p>
    </div>
  );
}

function TestimonialCard({ icon, text, name, role }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600">
        {icon}
      </div>

      <p className="mt-5 break-words text-sm leading-7 text-slate-600 sm:text-base">
        "{text}"
      </p>

      <h3 className="mt-6 font-bold text-slate-900">{name}</h3>
      <p className="mt-1 text-sm text-slate-500">{role}</p>
    </div>
  );
}

function Stat({ value, label, light = false }) {
  return (
    <div>
      <p
        className={`text-3xl font-extrabold sm:text-4xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {value}
      </p>

      <p
        className={`mt-2 text-sm ${
          light ? "text-blue-100" : "text-slate-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-10 w-px bg-slate-200 sm:block" />;
}

export default Home;