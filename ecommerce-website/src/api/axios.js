import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mern-ecommerce-project-rtjp.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;