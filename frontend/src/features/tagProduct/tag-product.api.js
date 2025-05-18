import axiosInstance from "@/services/axiosInstance";

export const getTagProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/tag-products");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
