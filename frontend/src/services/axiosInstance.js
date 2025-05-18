import axios from "axios";
let url = import.meta.env.VITE_BASEURL;
const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // You can add Authorization headers here if needed
    // 'Authorization': `Bearer ${token}`
  },
});

export default axiosInstance;
