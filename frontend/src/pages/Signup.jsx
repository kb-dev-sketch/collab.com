import {useState} from "react"
import { useNavigate } from "react-router-dom"
import {registerUser} from "../services/auth"
function Signup() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    role: "creator"
  })
  const handleChange=(e)=>{
    e.preventDefault()
    setformData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const response=await registerUser(formData)
      navigate("/login");
      console.log("Registration successful:",response)
    }
    catch(error){
      console.log(error.response?.data?.message || "Registration failed")
      alert("Registration failed")
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
   <form className="w-[400px] rounded-xl bg-white p-8 shadow-lg" onSubmit={handleSubmit}>
    <h1 className="mb-6 text-center text-3xl font-bold">
      Create Account 
    </h1>
    <input
      type="text"
      placeholder="Username"
      className="mb-4 w-full rounded-lg border p-3"
      name="username"
      value={formData.username}
      onChange={handleChange}
   
   />
     <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border p-3"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-lg border p-3"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <select
          className="mb-4 w-full rounded-lg border p-3"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
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