import axiosInstance from "@/services/axiosInstance";


// Login API
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Signup API
export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// // Logout API (optional)
// export const logout = async () => {
//   try {
//     const response = await axiosInstance.post("/auth/logout");
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };
