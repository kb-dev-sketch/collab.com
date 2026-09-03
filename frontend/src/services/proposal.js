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

export const createProposal = async (proposalData) => {
  try {
    const response = await API.post("/proposals/createProposal", proposalData);
    return response.data;
  } catch (error) {
    console.error("Error creating proposal:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const getProposalById = async (proposalId) => {
  try {
    const response = await API.get(`/proposals/getproposal/${proposalId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching proposal:", error);
  }
};
