import { Link } from "react-router-dom";
  import {AuthContext} from "../context/AuthContext";
  import Loader from "../components/Loader.jsx";
  import { useContext } from "react";
import {
  FiGrid,
  FiBriefcase,
  FiFileText,
  FiMessageSquare,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

function Sidebar() {
  const {user,loading,logout}=useContext(AuthContext);
  if(loading){
    return <Loader />
  }
  return (
    <div className="flex h-screen w-64 flex-col justify-between border-r bg-white p-5 shadow-sm">
      <div>
        {/* Logo */}

        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3 text-white">
            Collab Connect
          </div>
        </div>

        {/* Menu */}

        <ul className="space-y-3">
          <Link to="/dashboard">
            <li className="flex cursor-pointer items-center gap-3 rounded-xl bg-blue-100 px-4 py-3 font-medium text-blue-700">
              <FiGrid size={20} />
              Dashboard
            </li>
          </Link>

          <Link to="/campaigns">
            <li className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100">
              <FiBriefcase size={20} />
              Campaigns
            </li>
          </Link>

          <Link to="/proposals">
            <li className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100">
              <FiFileText size={20} />
              Proposals
            </li>
          </Link>

          <Link to="/messages">
            <li className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100">
              <FiMessageSquare size={20} />
              Messages
            </li>
          </Link>

          <Link to="/notifications">
            <li className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100">
              <FiBell size={20} />
              Notifications
            </li>
          </Link>

          <Link to="/profile">
            <li className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100">
              <FiUser size={20} />
              Profile
            </li>
          </Link>

          <Link to="/settings">
            <li className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100">
              <FiSettings size={20} />
              Settings
            </li>
          </Link>
        </ul>
      </div>

      { /* User +Logout */}
      <div className="border-t pt-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justfy-center rounded-full bg-blue-100 font-bold text-blue-600">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate fon-semibold">
              {user?.username}
            </h3>
            <p className="text-sm capitalize text gray-500">
              {user?.role}
            </p>

          </div>
        </div>
        <button 
        onClick={logout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50">
   <FiLogOut size={20} />
        </button>
     
      </div>
    </div>
  );
}

export default Sidebar;