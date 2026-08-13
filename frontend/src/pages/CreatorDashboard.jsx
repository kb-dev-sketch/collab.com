import Sidebar from "../components/Sidebar";
import {AuthContext} from "../context/AuthContext"
import { useContext } from "react";
function CreatorDashboard() {
  const {user,loading}=useContext(AuthContext)
  if(loading){
    return <p> Loading...</p>
  }
  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Greeting */}

        <h1 className="text-4xl font-bold">
          Hello, {user?.username}
        </h1>

        <p className="mt-2 text-gray-500">
          Here's what's happening today.
        </p>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-4 gap-6">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">12</h2>
            <p className="text-gray-500">Active Proposals</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">5</h2>
            <p className="text-gray-500">Ongoing Campaigns</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">3</h2>
            <p className="text-gray-500">Completed Campaigns</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">₹45000</h2>
            <p className="text-gray-500">Total Earnings</p>
          </div>
        </div>

        {/* Recommended Campaigns */}

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">
            Recommended Campaigns
          </h2>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">
              TechGear Summer Blast
            </h3>

            <p className="mt-2 text-gray-500">
              Budget: ₹25,000 - ₹50,000
            </p>

            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorDashboard;