import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-ecommerce-project-rtjp.onrender.com/api/cart",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;