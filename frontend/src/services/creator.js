import API from "./api";

export const getCreatorProfile = async () => {
  try {
    const response = await API.get("/creators/creatorProfile");
    return response.data;
  } catch (error) {
    console.error("Error fetching creator profile:", error);
    throw error;
  }
};

export const createCreatorProfile=async(profileData)=>{
  const response=await API.post(
    "/creator/creatorProfile",
    profileData
  );
  return response.data
}

export const updateCreatorProfile=async(profileData)=>{
  const response=await API.patch(
    "/creator/update_creatorProfile",
    profileData
  );
  return response.data
}