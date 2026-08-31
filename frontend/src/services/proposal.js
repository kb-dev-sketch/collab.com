import API from "./api";

export const getProposalBycampaignId = async (campaignId) => {
  try {
    const response = await API.get(
      `/proposals/getproposalsBycampaign/${campaignId}`,
    );
    return response.data;
  } catch (error) {
    console.error(" error fetching in proposals", error);
  }
};
