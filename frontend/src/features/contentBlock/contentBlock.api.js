import axiosInstance from "@/services/axiosInstance";

export const getContentBlocks = async (query) => {
  
  try {
    const response = await axiosInstance.get(
      `/content-blocks?identifier=${query}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
