function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
   <form className="w-[400px] rounded-xl bg-white p-8 shadow-lg">
    <h1 className="mb-6 text-center text-3xl font-bold">
      Create Account 
    </h1>
    <input 
    type="email"
    placeholder="Username"
    className="mb-4 w-full rounded-lg border p-3"
   />
     <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-lg border p-3"
        />
<select className="mb-4 w-full rounded-lg border p-3">
  <option value ="">Select Role</option>
  <option value="brand">Brand</option>
  <option value="creator">Creator</option>
</select>
 <button className="w-full rounded-lg bg-blue-600 py-3 text-white">
          Sign Up
        </button>
   </form>
    </div>
  )
}

export default Signup;