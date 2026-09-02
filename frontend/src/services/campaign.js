import API from "./api";
export const getAllCampaigns = async () => {
  const response = await API.get("/campaigns/getallCampaign");
  return response.data;
};

export const getCampaignById = async (campaignId) => {
  const response = await API.get(`/campaigns/getCampaignById/${campaignId}`);

  return response.data;
};
export const createCampaign = async (formData) => {
  const response = await API.post("/campaigns/createCampaign", formData);
  return response.data;
};
