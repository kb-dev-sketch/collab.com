import { Link } from "react-router-dom";
import {useState} from "react";
import { loginUser } from "../services/auth";
import { getCreatorProfile } from "../services/creator.js";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext.jsx'
import { getbrandProfile } from "../services/brand.js";
function Login() {
  const {setUser}=useAuth()
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  
const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    const data=await loginUser(formData);
    


    console.log("Login successful:", data);
    alert("Login Successful")
    localStorage.setItem(
  "accessToken",
  data.data.accessToken
);

localStorage.setItem(
  "refreshToken",
  data.data.refreshToken
);
const loggedInUser=data.data.user;

setUser(loggedInUser)

if(loggedInUser.role==="creator"){
  try{
    await getCreatorProfile();
    // Profile already exists
    navigate("/creator-dashboard")
  }
  catch(error){
    if(error.response?.status===404){
      navigate("/creator-profile")
    }
    else{
      console.error(error)
      alert("Something went wrong")
    }
  }

}
else if(loggedInUser.role==="brand"){
  try{
    await getbrandProfile()
    navigate("/brand-dashboard")
  }
  catch(error){
    if(error.response?.status==404){
      navigate("/brand-profile")
    }
    else{
      console.error(error)
      alert("Somethong went wrong")
    }
  }
}
  }
  catch(error){
    console.log(error.response?.data?.message || "Login failed");
    alert("Login failed")
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Login to your account
        </p>

        <form className="space-y-4" onSubmit ={handleSubmit}>
            {/* Username input field */}
          <div>
            <label className="mb-2 block font-medium">Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              name="username"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              name="password"
              value={formData.password}
              onChange={handleChange}
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