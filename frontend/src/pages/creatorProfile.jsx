import {useState,useEffect} from "react";
import { getCreatorProfile,updateCreatorProfile,createCreatorProfile } from "../services/creator.js";
import Loader from "../components/Loader.jsx";
function CreatorProfile() {
  const [formData,setFormData]=useState({
    name:"",
    niches:[],
    profileImage:"",
    bio:"",
    city:"",
    language:"",
    socials:{
      instagram:"",
      youtube:"",
      twitter:"",
      tiktok:"",
      website:""
    },
    followers:0,
    engagementRate:0,
    pricePerPost:0,
    portfolioLinks:[]
  })

  const [loading,setLoading]=useState(true);
  const [profileExists,setProfileExists]=useState(false)

  // get Profile

  useEffect(()=>{
    const fetchProfile=async()=>{
      try{
        const response=await getCreatorProfile();

        setFormData(response.data)
        setProfileExists(true)
      }
      catch(error){
        console.log("profile not found",error)
        setProfileExists(false)
      }
      finally{
        setLoading(false)
      }
    }
    fetchProfile(); 
  },[])

  const handleChnage=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
    // CREATE /UPDATE
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      let response;
      if(profileExists){
        response=await updateCreatorProfile(formData)
      }
      else{
        response=await createCreatorProfile(formData)
      }
      setFormData(response.data)
      alert(
        profileExists
        ? "profile updated successfully"
        :"Profile created successfully"
      );
      setProfileExists(true)
    }
    catch(error){
      console.error("Profile error",error)
    }
  }
  if(loading){
    return <Loader />
  }
  return(
    <div className='p-8'>
        <h1 className="mb-6 text-3xl font-bold">Creator Profile</h1>
        <form onSubmit ={handleSubmit}
        className="space-y-4">
            <input 
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="text"
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            value={formData.socials.instagram}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="text"
            name="youtube"
            placeholder="YouTube"
            value={formData.socials.youtube}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="text"
            name="twitter"
            placeholder="Twitter"
            value={formData.socials.twitter}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="text"
            name="tiktok"
            placeholder="TikTok"
            value={formData.socials.tiktok}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.socials.website}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="number"
            name="followers"
            placeholder="Followers"
            value={formData.followers}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="number"
            name="engagementRate"
            placeholder="Engagement Rate"
            value={formData.engagementRate}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
            <input
            type="number"
            name="pricePerPost"
            placeholder="Price Per Post"
            value={formData.pricePerPost}
            onChange={handleChnage}
            className="w-full rounded border p-3"
            />
          <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            {profileExists ? "Update Profile" :"Create Profile"}
          </button>
        </form>
    </div>
  )
}
export default CreatorProfile;