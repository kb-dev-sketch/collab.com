import API from "./api";

export const getbrandProfile=async()=>{
 try{
    const response=await API.get("brands/getBrandProfile")
     return response.data
 }
 catch(error){
    console.error("Error fetching in brand Profile",error)
    throw error
 }
}
export const createBrandProfile=async()=>{
    try{
        const response=await API.post("brands/createbrandProfile")
        return response.data
    }
    catch(error){
        console.error("error in creating brand Profile",error)
        throw error
    }

}

