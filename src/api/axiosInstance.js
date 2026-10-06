// We use axios.create() so we don't have to type the full URL every time
// Instead of writing "https://dummyjson.com/products" in every file,
// we just write "/products" and axios adds the base URL automatically

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com", // the starting part of every API URL
});

export default axiosInstance;
