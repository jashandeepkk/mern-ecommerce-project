import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-ecommerce-project-rtjp.onrender.com/api/wishlist",
});

export default API;