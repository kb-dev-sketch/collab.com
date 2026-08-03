import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}

      <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between px-10 lg:flex-row">
        {/* Left Side */}

        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold leading-tight">
            Connect Brands with
            <span className="text-blue-600"> Creators 🚀</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Find influencers, launch campaigns and collaborate in real time.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
              Join as Creator
            </button>

            <button className="rounded-lg border px-6 py-3 transition hover:bg-gray-100">
              Join as Brand
            </button>
          </div>
        </div>

        {/* Right Side */}

        <div className="mt-10 flex h-[400px] w-[400px] items-center justify-center rounded-full bg-blue-100 lg:mt-0">
          <span className="text-8xl">🚀</span>
        </div>
      </section>

      {/* Features Section */}

      <section id="features" className="mx-auto max-w-7xl px-10 py-20">
        <h2 className="text-center text-4xl font-bold">
          Why Choose CollabConnect?
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Everything you need to collaborate with brands and creators.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-5xl">📢</div>

            <h3 className="mt-4 text-2xl font-semibold">
              Create Campaigns
            </h3>

            <p className="mt-2 text-gray-600">
              Brands can create and manage campaigns easily.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-5xl">📨</div>

            <h3 className="mt-4 text-2xl font-semibold">
              Send Proposals
            </h3>

            <p className="mt-2 text-gray-600">
              Creators can send proposals to brands.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-5xl">💬</div>

            <h3 className="mt-4 text-2xl font-semibold">Real-time Chat</h3>

            <p className="mt-2 text-gray-600">
              Communicate instantly with creators and brands.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-5xl">🔔</div>

            <h3 className="mt-4 text-2xl font-semibold">Notifications</h3>

            <p className="mt-2 text-gray-600">
              Get notified about proposals and messages.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-10">
          <h2 className="text-center text-4xl font-bold">How It Works</h2>

          <p className="mt-4 text-center text-gray-600">
            Collaborate in just 4 simple steps.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-gray-50 p-6 text-center shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                1
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Create Campaign
              </h3>

              <p className="mt-2 text-gray-600">
                Brands create campaigns and describe requirements.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-6 text-center shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                2
              </div>

              <h3 className="mt-4 text-xl font-semibold">Send Proposal</h3>

              <p className="mt-2 text-gray-600">
                Creators apply by sending proposals.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-6 text-center shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                3
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Accept Proposal
              </h3>

              <p className="mt-2 text-gray-600">
                Brands review and accept creators.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-6 text-center shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                4
              </div>

              <h3 className="mt-4 text-xl font-semibold">Start Chat</h3>

              <p className="mt-2 text-gray-600">
                Chat in real time and complete collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="bg-blue-600 py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-10 text-center md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-5xl font-bold">1000+</h2>
            <p className="mt-2 text-lg">Creators</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p className="mt-2 text-lg">Brands</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">2000+</h2>
            <p className="mt-2 text-lg">Campaigns</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">50K+</h2>
            <p className="mt-2 text-lg">Messages</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-10">
          <h2 className="text-center text-4xl font-bold">
            What People Say
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-gray-600">
                "Amazing platform! We found the perfect creator in just a few
                days."
              </p>

              <h3 className="mt-4 text-xl font-semibold">Nike</h3>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-gray-600">
                "Collaboration with brands has become super easy."
              </p>

              <h3 className="mt-4 text-xl font-semibold">Creator</h3>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-gray-600">
                "Real-time chat and notifications are awesome."
              </p>

              <h3 className="mt-4 text-xl font-semibold">Samsung</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;