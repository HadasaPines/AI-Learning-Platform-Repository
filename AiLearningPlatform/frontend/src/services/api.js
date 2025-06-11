import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = (data) => API.post("/users/", data);

export const loginUser = async (name, phone) => {
  try {
    const response = await API.post("/users/login", { name, phone });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
