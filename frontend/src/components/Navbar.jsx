 import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="
        flex items-center justify-between
        border-b border-slate-200
        bg-white
        px-4 py-3
        shadow-sm
        sm:px-6 sm:py-4
        lg:px-8
      "
    >
      <Link
        to="/"
        className="
          shrink-0
          text-xl font-bold
          text-blue-600
          sm:text-2xl
        "
      >
        CollabConnect
      </Link>

      <div
        className="
          flex items-center
          gap-3
          text-sm
          font-medium
          text-slate-600
          sm:gap-5
          sm:text-base
          lg:gap-6
        "
      >
        <Link
          to="/"
          className="transition hover:text-blue-600"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="transition hover:text-blue-600"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="
            rounded-lg
            bg-blue-600
            px-3 py-2
            text-white
            transition
            hover:bg-blue-700
            sm:px-4
          "
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;