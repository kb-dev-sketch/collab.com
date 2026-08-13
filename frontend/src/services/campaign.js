import API from "./api";
export const getAllCampaigns = async () => {
  const response = await API.get("/campaigns/getallCampaign");
  return response.data;
};
