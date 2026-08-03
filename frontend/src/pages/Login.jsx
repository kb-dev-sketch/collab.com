import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Login to your account
        </p>

        <form className="space-y-4">
            {/* Username input field */}
          <div>
            <label className="mb-2 block font-medium">Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;