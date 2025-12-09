import axios from "axios";

export const api = axios.create({
  baseURL: "https://cs631-backend.onrender.com/api",
});
